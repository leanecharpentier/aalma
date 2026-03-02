import { Injectable } from "@nestjs/common";
import { CreateQuestionDto } from "./dto/create-question.dto";
import { UpdateQuestionDto } from "./dto/update-question.dto";
import { AppDataSource } from "DataSource";
import { Question } from "typeorm/entities/Question";
import { ActivityLogService } from "src/activity-log/activity-log.service";
import { User } from "typeorm/entities/User";
import { ACTIVITY_FAIL } from "typeorm/entities/ActivityLog";

@Injectable()
export class QuestionService {
  constructor(private readonly activityLogService: ActivityLogService) {}

  async create(createQuestionDto: CreateQuestionDto, connectedUser: User) {
    try {
      const existingQuestion = await AppDataSource.getRepository(Question)
        .createQueryBuilder("question")
        .where("question.label = :name", {
          name: createQuestionDto.label,
        })
        .getOne();
      if (!existingQuestion) {
        return await AppDataSource.getRepository(Question)
          .createQueryBuilder("question")
          .insert()
          .values(createQuestionDto)
          .execute();
      } else {
        this.activityLogService.log({
          userId: connectedUser.id,
          action: "question.created",
          status: ACTIVITY_FAIL,
          details: `Team ${createQuestionDto.label} already exists`,
        });
        return {
          success: false,
          message: `Team ${createQuestionDto.label} already exists`,
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

  async findAll() {
    return await AppDataSource.getRepository(Question)
      .createQueryBuilder("question")
      .getMany();
  }

  async findOne(id: number) {
    return await AppDataSource.getRepository(Question)
      .createQueryBuilder("question")
      .where("question.id = :id", { id })
      .getOne();
  }

  async update(
    id: number,
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

  async remove(id: number, connectedUser: User) {
    try {
      return await AppDataSource.getRepository(Question)
        .createQueryBuilder("question")
        .delete()
        .where("question.id = :id", { id })
        .execute();
    } catch (e) {
      this.activityLogService.log({
        userId: connectedUser.id,
        action: "team.deleted",
        status: ACTIVITY_FAIL,
        details: e.detail,
      });
      return { success: false, message: e.detail };
    }
  }
}
