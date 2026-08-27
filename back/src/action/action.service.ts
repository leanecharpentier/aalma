import { Injectable, Search } from "@nestjs/common";
import { CreateActionDto } from "./dto/create-action.dto";
import { UpdateActionDto } from "./dto/update-action.dto";
import { AppDataSource } from "DataSource";
import { Action } from "typeorm/entities/Action";
import { User } from "typeorm/entities/User";
import { ActivityLogService } from "src/activity-log/activity-log.service";
import { ACTIVITY_FAIL } from "typeorm/entities/ActivityLog";
import { SUPER_ADMIN_ROLE_ID } from "typeorm/entities/Role";

@Injectable()
export class ActionService {
  constructor(private readonly activityLogService: ActivityLogService) {}

  async create(createActionDto: CreateActionDto, connectedUser: User) {
    try {
      const result = await AppDataSource.getRepository(Action)
        .createQueryBuilder("action")
        .insert()
        .values(createActionDto)
        .execute();
      return result;
    } catch (e) {
      this.activityLogService.log({
        userId: connectedUser.id,
        action: "action.created",
        status: ACTIVITY_FAIL,
        details: e.detail,
      });
      return { success: false, message: e.detail };
    }
  }

  async findAll(filters: Record<string, string>) {
    const ALLOWED_FILTERS = ["category_id", "format_id", "company_id", "speaker_id"];

    const query = AppDataSource.getRepository(Action)
      .createQueryBuilder("action")
      .leftJoinAndSelect("action.category", "category")
      .leftJoinAndSelect("action.format", "format")
      .leftJoinAndSelect("action.speaker", "speaker")
      .leftJoinAndSelect("action.company", "company");

    Object.keys(filters).forEach((property) => {
      if (property === "search") {
        query.andWhere(
          "(action.title LIKE :search OR action.description LIKE :search)",
          { search: `%${filters[property]}%` },
        );
      } else if (ALLOWED_FILTERS.includes(property)) {
        query.andWhere(`action.${property} = :${property}`, {
          [property]: filters[property],
        });
      }
    });

    return await query.orderBy("category.id").getMany();
  }

  async findOne(id: string): Promise<Action | null> {
    return await AppDataSource.getRepository(Action)
      .createQueryBuilder("action")
      .leftJoinAndSelect("action.category", "category")
      .where("action.id = :id", { id })
      .getOne();
  }

  async update(
    id: string,
    updateActionDto: UpdateActionDto,
    connectedUser: User,
  ) {
    try {
      const result = await AppDataSource.getRepository(Action)
        .createQueryBuilder("action")
        .update()
        .set(updateActionDto)
        .where("action.id = :id", { id })
        .execute();
      return result;
    } catch (e) {
      this.activityLogService.log({
        userId: connectedUser.id,
        action: "action.updated",
        status: ACTIVITY_FAIL,
        details: e.detail,
      });
      return { success: false, message: e.detail };
    }
  }

  async remove(id: string, connectedUser: User) {
    try {
      return await AppDataSource.getRepository(Action)
        .createQueryBuilder("action")
        .delete()
        .where("action.id = :id", { id })
        .execute();
    } catch (e) {
      this.activityLogService.log({
        userId: connectedUser.id,
        action: "action.deleted",
        status: ACTIVITY_FAIL,
        details: e.detail,
      });
      return { success: false, message: e.detail };
    }
  }
}
