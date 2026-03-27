import { Injectable } from "@nestjs/common";
import { CreateAnswerDto } from "./dto/create-answer.dto";
import { User } from "better-auth";
import { AppDataSource } from "DataSource";
import { ACTIVITY_FAIL } from "typeorm/entities/ActivityLog";
import { ActivityLogService } from "src/activity-log/activity-log.service";
import { Answer } from "typeorm/entities/Answer";
import { Form } from "typeorm/entities/Form";

@Injectable()
export class AnswerService {
  constructor(private readonly activityLogService: ActivityLogService) {}

  async create(createAnswerDto: CreateAnswerDto, connectedUser: User) {
    try {
      const existingAnswer = await AppDataSource.getRepository(Answer)
        .createQueryBuilder("answer")
        .where(
          "answer.user_id = :user AND answer.form_id = :form AND answer.question_id < :question",
          {
            user: connectedUser.id,
            form: createAnswerDto.form_id,
            question: createAnswerDto.question_id,
          },
        )
        .getOne();
      if (!existingAnswer) {
        const form = await AppDataSource.getRepository(Form)
          .createQueryBuilder("form")
          .where(
            "form.startDate <= :today AND form.endDate >= :today AND form.id = :id",
            {
              today: new Date(),
              form: createAnswerDto.form_id,
            },
          )
          .getOne();
        if (form) {
          const result = await AppDataSource.getRepository(Answer)
            .createQueryBuilder("answer")
            .insert()
            .values({ ...createAnswerDto, user_id: connectedUser.id })
            .execute();

          return result;
        } else {
          this.activityLogService.log({
            userId: connectedUser.id,
            action: "answer.created",
            status: ACTIVITY_FAIL,
            details: `Form is not open`,
          });
          return {
            success: false,
            message: `Form is not open`,
          };
        }
      } else {
        this.activityLogService.log({
          userId: connectedUser.id,
          action: "answer.created",
          status: ACTIVITY_FAIL,
          details: `Question was already answered`,
        });
        return {
          success: false,
          message: `Question was already answered`,
        };
      }
    } catch (e) {
      this.activityLogService.log({
        userId: connectedUser.id,
        action: "answer.created",
        status: ACTIVITY_FAIL,
        details: e.detail,
      });
      return { success: false, message: e.detail };
    }
  }

  async remove(id: string, connectedUser: User) {
    try {
      return await AppDataSource.getRepository(Answer)
        .createQueryBuilder("answer")
        .delete()
        .where("answer.id = :id", { id })
        .execute();
    } catch (e) {
      this.activityLogService.log({
        userId: connectedUser.id,
        action: "answer.deleted",
        status: ACTIVITY_FAIL,
        details: e.detail,
      });
      return { success: false, message: e.detail };
    }
  }
}
