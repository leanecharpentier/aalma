import { Injectable } from "@nestjs/common";
import { CreatePropositionDto } from "./dto/create-proposition.dto";
import { UpdatePropositionDto } from "./dto/update-proposition.dto";
import { AppDataSource } from "DataSource";
import { Proposition } from "typeorm/entities/Proposition";
import { ActivityLogService } from "src/activity-log/activity-log.service";
import { User } from "better-auth";
import { ACTIVITY_FAIL } from "typeorm/entities/ActivityLog";

@Injectable()
export class PropositionService {
  constructor(private readonly activityLogService: ActivityLogService) {}

  /**
   * Crée une nouvelle proposition pour une question.
   * @param createPropositionDto Données de la proposition à créer
   * @param connectedUser Utilisateur actuellement connecté
   * @returns Résultat de la création de la proposition
   */
  async create(
    createPropositionDto: CreatePropositionDto,
    connectedUser: User,
  ) {
    try {
      const existingProposition = await AppDataSource.getRepository(Proposition)
        .createQueryBuilder("proposition")
        .where(
          "proposition.content = :name AND proposition.question_id = :question",
          {
            name: createPropositionDto.content,
            question: createPropositionDto.question_id,
          },
        )
        .getOne();
      if (!existingProposition) {
        const result = await AppDataSource.getRepository(Proposition)
          .createQueryBuilder("question")
          .insert()
          .values(createPropositionDto)
          .execute();

        return result;
      } else {
        this.activityLogService.log({
          userId: connectedUser.id,
          action: "proposition.created",
          status: ACTIVITY_FAIL,
          details: `Proposition "${createPropositionDto.content}" already exists on for this question`,
        });
        return {
          success: false,
          message: `Proposition "${createPropositionDto.content}" already exists on for this question`,
        };
      }
    } catch (e) {
      this.activityLogService.log({
        userId: connectedUser.id,
        action: "proposition.created",
        status: ACTIVITY_FAIL,
        details: e.detail,
      });
      return { success: false, message: e.detail };
    }
  }

  /**
   * Récupère une proposition à partir de son identifiant.
   * @param id Identifiant de la proposition
   * @returns Proposition correspondante
   */
  async findOne(id: string) {
    return await AppDataSource.getRepository(Proposition)
      .createQueryBuilder("proposition")
      .where("proposition.id = :id", { id })
      .getOne();
  }

  /**
   * Met à jour une proposition existante.
   * @param id Identifiant de la proposition
   * @param updatePropositionDto Données de la proposition à mettre à jour
   * @param connectedUser Utilisateur actuellement connecté
   * @returns Résultat de la mise à jour de la proposition
   */
  async update(
    id: string,
    updatePropositionDto: UpdatePropositionDto,
    connectedUser: User,
  ) {
    try {
      return await AppDataSource.getRepository(Proposition)
        .createQueryBuilder("proposition")
        .update()
        .set(updatePropositionDto)
        .where("proposition.id = :id", { id })
        .execute();
    } catch (e) {
      this.activityLogService.log({
        userId: connectedUser.id,
        action: "proposition.updated",
        status: ACTIVITY_FAIL,
        details: e.detail,
      });
      return { success: false, message: e.detail };
    }
  }

  /**
   * Supprime une proposition existante.
   * @param id Identifiant de la proposition
   * @param connectedUser Utilisateur actuellement connecté
   * @returns Résultat de la suppression de la proposition
   */
  async remove(id: string, connectedUser: User) {
    try {
      return await AppDataSource.getRepository(Proposition)
        .createQueryBuilder("question")
        .delete()
        .where("question.id = :id", { id })
        .execute();
    } catch (e) {
      this.activityLogService.log({
        userId: connectedUser.id,
        action: "proposition.deleted",
        status: ACTIVITY_FAIL,
        details: e.detail,
      });
      return { success: false, message: e.detail };
    }
  }
}