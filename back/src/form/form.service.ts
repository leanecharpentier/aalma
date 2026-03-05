import { Injectable } from "@nestjs/common";
import { CreateFormDto } from "./dto/create-form.dto";
import { UpdateFormDto } from "./dto/update-form.dto";
import { AppDataSource } from "DataSource";
import { Form } from "typeorm/entities/Form";
import { User } from "typeorm/entities/User";
import { ActivityLogService } from "src/activity-log/activity-log.service";
import { ACTIVITY_FAIL } from "typeorm/entities/ActivityLog";

@Injectable()
export class FormService {
  constructor(private readonly activityLogService: ActivityLogService) {}

  async create(createFormDto: CreateFormDto, connectedUser: User) {
    try {
      const user = await AppDataSource.getRepository(User)
        .createQueryBuilder("user")
        .where("user.id = :id", { id: connectedUser.id })
        .getOne();
      const existingForm = await AppDataSource.getRepository(Form)
        .createQueryBuilder("form")
        .where(
          "form.name = :name AND form.company_id = :company AND form.endDate < :endDate",
          {
            name: createFormDto.name,
            company: (await user?.getCompanyId()) ?? createFormDto.company_id,
            endDate: createFormDto.startDate,
          },
        )
        .getOne();
      if (!existingForm) {
        const result = await AppDataSource.getRepository(Form)
          .createQueryBuilder("form")
          .insert()
          .values(createFormDto)
          .execute();

        return result;
      } else {
        this.activityLogService.log({
          userId: connectedUser.id,
          action: "form.created",
          status: ACTIVITY_FAIL,
          details: `Form "${createFormDto.name}" already exists on this period`,
        });
        return {
          success: false,
          message: `Form "${createFormDto.name}" already exists on`,
        };
      }
    } catch (e) {
      this.activityLogService.log({
        userId: connectedUser.id,
        action: "form.created",
        status: ACTIVITY_FAIL,
        details: e.detail,
      });
      return { success: false, message: e.detail };
    }
  }

  async findAll() {
    return await AppDataSource.getRepository(Form)
      .createQueryBuilder("form")
      .getMany();
  }

  async findCurrent(connectedUser: User) {
    const user = await AppDataSource.getRepository(User)
      .createQueryBuilder("user")
      .where("user.id = :id", { id: connectedUser.id })
      .getOne();
    return await AppDataSource.getRepository(Form)
      .createQueryBuilder("form")
      .leftJoinAndSelect("form.answers", "answers")
      .where(
        "form.startDate <= :today AND form.endDate >= :today AND form.company_id = :company_id AND (answers.id IS NULL OR answers.user_id != :user_id)",
        {
          today: new Date(),
          company_id: await user?.getCompanyId(),
          user_id: user?.id,
        },
      )
      .getMany();
  }

  async findOne(id: number, answer?: boolean) {
    const query = await AppDataSource.getRepository(Form)
      .createQueryBuilder("form")
      .leftJoinAndSelect("form.template", "form_template")
      .leftJoinAndSelect("form_template.questions", "questions")
      .leftJoinAndSelect("questions.question", "question")
      .leftJoinAndSelect("question.propositions", "propositions")
      .where("form.id = :id", { id });

    if (answer) {
      query.leftJoinAndSelect("form.answers", "answers");
    }
    const result = await query.getOne();
    return result;
  }

  async update(id: number, updateFormDto: UpdateFormDto, connectedUser: User) {
    try {
      if (updateFormDto.name) {
        await AppDataSource.getRepository(Form)
          .createQueryBuilder("form")
          .update()
          .set(updateFormDto)
          .where("form.id = :id", { id })
          .execute();
      }
      return await this.findOne(id);
    } catch (e) {
      this.activityLogService.log({
        userId: connectedUser.id,
        action: "form.updated",
        status: ACTIVITY_FAIL,
        details: e.detail,
      });
      return { success: false, message: e.detail };
    }
  }

  async remove(id: number, connectedUser: User) {
    try {
      return await AppDataSource.getRepository(Form)
        .createQueryBuilder("form")
        .delete()
        .where("form.id = :id", { id })
        .execute();
    } catch (e) {
      this.activityLogService.log({
        userId: connectedUser.id,
        action: "form.deleted",
        status: ACTIVITY_FAIL,
        details: e.detail,
      });
      return { success: false, message: e.detail };
    }
  }
}
