import { Injectable } from "@nestjs/common";
import { CreateFormTemplateDto } from "./dto/create-form-template.dto";
import { UpdateFormTemplateDto } from "./dto/update-form-template.dto";
import { AppDataSource } from "DataSource";
import { FormTemplate } from "typeorm/entities/FormTemplate";
import { ActivityLogService } from "src/activity-log/activity-log.service";
import { ACTIVITY_FAIL } from "typeorm/entities/ActivityLog";
import { User } from "better-auth";
import { FormTemplateQuestion } from "typeorm/entities/FormTemplateQuestion";
import { Question } from "typeorm/entities/Question";

@Injectable()
export class FormTemplateService {
  constructor(private readonly activityLogService: ActivityLogService) {}

  async create(
    createFormTemplateDto: CreateFormTemplateDto,
    connectedUser: User,
  ) {
    try {
      const existingTemplate = await AppDataSource.getRepository(FormTemplate)
        .createQueryBuilder("form_template")
        .where("form_template.name = :name", {
          name: createFormTemplateDto.name,
        })
        .getOne();
      if (!existingTemplate) {
        const result = await AppDataSource.getRepository(FormTemplate)
          .createQueryBuilder("form_template")
          .insert()
          .values(createFormTemplateDto)
          .execute();

        createFormTemplateDto.questions_ids.forEach((question_id) => {
          AppDataSource.getRepository(FormTemplateQuestion)
            .createQueryBuilder("form_template")
            .insert()
            .values({ template_id: result.identifiers[0].id, question_id })
            .execute();
        });

        return result;
      } else {
        this.activityLogService.log({
          userId: connectedUser.id,
          action: "form.template.created",
          status: ACTIVITY_FAIL,
          details: `Template "${createFormTemplateDto.name}" already exists`,
        });
        return {
          success: false,
          message: `Template "${createFormTemplateDto.name}" already exists`,
        };
      }
    } catch (e) {
      this.activityLogService.log({
        userId: connectedUser.id,
        action: "form.template.created",
        status: ACTIVITY_FAIL,
        details: e.detail,
      });
      return { success: false, message: e.detail };
    }
  }

  async findAll() {
    return await AppDataSource.getRepository(FormTemplate)
      .createQueryBuilder("form_template")
      .getMany();
  }

  async findOne(id: number) {
    const template = await AppDataSource.getRepository(FormTemplate)
      .createQueryBuilder("form_template")
      .leftJoinAndSelect("form_template.questions", "question")
      .where("form_template.id = :id", { id })
      .getOne();

    if (template?.questions && template.questions.length > 0) {
      const questionIds = template.questions.map((q) => q.question_id);

      const fullQuestions = await AppDataSource.getRepository(Question)
        .createQueryBuilder("question")
        .leftJoinAndSelect("question.propositions", "proposition")
        .where("question.id IN (:...ids)", { ids: questionIds })
        .getMany();
      return { ...template, fullQuestions };
    }
    return template;
  }

  async update(
    id: number,
    updateFormTemplateDto: UpdateFormTemplateDto,
    connectedUser: User,
  ) {
    try {
      if (updateFormTemplateDto.name) {
        await AppDataSource.getRepository(FormTemplate)
          .createQueryBuilder("form_template")
          .update()
          .set({ name: updateFormTemplateDto.name })
          .where("form_template.id = :id", { id })
          .execute();
      }

      if (updateFormTemplateDto.questions_ids) {
        await AppDataSource.getRepository(FormTemplateQuestion)
          .createQueryBuilder()
          .delete()
          .where("template_id = :id", { id })
          .execute();

        if (updateFormTemplateDto.questions_ids.length > 0) {
          const newLinks = updateFormTemplateDto.questions_ids.map(
            (question_id) => ({
              template_id: id,
              question_id,
            }),
          );

          await AppDataSource.getRepository(FormTemplateQuestion)
            .createQueryBuilder()
            .insert()
            .values(newLinks)
            .execute();
        }
      }

      return await this.findOne(id);
    } catch (e) {
      this.activityLogService.log({
        userId: connectedUser.id,
        action: "form.template.updated",
        status: ACTIVITY_FAIL,
        details: e.detail,
      });
      return { success: false, message: e.detail };
    }
  }

  async remove(id: number, connectedUser: User) {
    try {
      await AppDataSource.getRepository(FormTemplateQuestion)
        .createQueryBuilder()
        .delete()
        .where("template_id = :id", { id })
        .execute();

      return await AppDataSource.getRepository(FormTemplate)
        .createQueryBuilder("form_template")
        .delete()
        .where("form_template.id = :id", { id })
        .execute();
    } catch (e) {
      this.activityLogService.log({
        userId: connectedUser.id,
        action: "form.template.deleted",
        status: ACTIVITY_FAIL,
        details: e.detail,
      });
      return { success: false, message: e.detail };
    }
  }
}
