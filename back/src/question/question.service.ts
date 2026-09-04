import { Injectable } from "@nestjs/common";
import { CreateQuestionDto } from "./dto/create-question.dto";
import { UpdateQuestionDto } from "./dto/update-question.dto";
import { AppDataSource } from "DataSource";
import { Question } from "typeorm/entities/Question";
import { ActivityLogService } from "src/activity-log/activity-log.service";
import { User } from "typeorm/entities/User";
import { ACTIVITY_FAIL } from "typeorm/entities/ActivityLog";
import { PropositionService } from "src/proposition/proposition.service";
import { FormTemplateQuestion } from "typeorm/entities/FormTemplateQuestion";

@Injectable()
export class QuestionService {
  constructor(
    private readonly activityLogService: ActivityLogService,
    private readonly propositionService: PropositionService,
  ) {}

  /**
   * Crée une nouvelle question avec ses propositions associées.
   * @param createQuestionDto Données de la question à créer
   * @param connectedUser Utilisateur actuellement connecté
   * @returns Résultat de la création de la question
   */
  async create(createQuestionDto: CreateQuestionDto, connectedUser: User) {
    try {
      const existingQuestion = await AppDataSource.getRepository(Question)
        .createQueryBuilder("question")
        .where("question.label = :name", {
          name: createQuestionDto.label,
        })
        .getOne();
      if (!existingQuestion) {
        const result = await AppDataSource.getRepository(Question)
          .createQueryBuilder("question")
          .insert()
          .values(createQuestionDto)
          .execute();

        if (createQuestionDto.propositions) {
          createQuestionDto.propositions.forEach((proposition) => {
            proposition.question_id = result.identifiers[0].id;
            this.propositionService.create(proposition, connectedUser);
          });
        }
        return result;
      } else {
        this.activityLogService.log({
          userId: connectedUser.id,
          action: "question.created",
          status: ACTIVITY_FAIL,
          details: `Question "${createQuestionDto.label}" already exists`,
        });
        return {
          success: false,
          message: `Question "${createQuestionDto.label}" already exists`,
        };
      }
    } catch (e) {
      this.activityLogService.log({
        userId: connectedUser.id,
        action: "question.created",
        status: ACTIVITY_FAIL,
        details: e.detail,
      });
      return { success: false, message: e.detail };
    }
  }

  /**
   * Récupère toutes les questions.
   * @returns Liste des questions
   */
  async findAll() {
    return await AppDataSource.getRepository(Question)
      .createQueryBuilder("question")
      .getMany();
  }

  /**
   * Récupère une question avec ses propositions associées.
   * @param id Identifiant de la question
   * @returns Question correspondante avec ses propositions
   */
  async findOne(id: string) {
    return await AppDataSource.getRepository(Question)
      .createQueryBuilder("question")
      .leftJoinAndSelect("question.propositions", "proposition")
      .where("question.id = :id", { id })
      .getOne();
  }

  /**
   * Met à jour une question existante.
   * @param id Identifiant de la question
   * @param updateQuestionDto Données de la question à mettre à jour
   * @param connectedUser Utilisateur actuellement connecté
   * @returns Résultat de la mise à jour de la question
   */
  async update(
    id: string,
    updateQuestionDto: UpdateQuestionDto,
    connectedUser: User,
  ) {
    try {
      return await AppDataSource.getRepository(Question)
        .createQueryBuilder("question")
        .update()
        .set(updateQuestionDto)
        .where("question.id = :id", { id })
        .execute();
    } catch (e) {
      this.activityLogService.log({
        userId: connectedUser.id,
        action: "question.updated",
        status: ACTIVITY_FAIL,
        details: e.detail,
      });
      return { success: false, message: e.detail };
    }
  }

  async remove(id: string, connectedUser: User) {
    try {
      await AppDataSource.getRepository(FormTemplateQuestion)
        .createQueryBuilder()
        .delete()
        .where("question_id = :id", { id })
        .execute();
      return await AppDataSource.getRepository(Question)
        .createQueryBuilder("question")
        .delete()
        .where("question.id = :id", { id })
        .execute();
    } catch (e) {
      this.activityLogService.log({
        userId: connectedUser.id,
        action: "question.deleted",
        status: ACTIVITY_FAIL,
        details: e.detail,
      });
      return { success: false, message: e.detail };
    }
  }
}