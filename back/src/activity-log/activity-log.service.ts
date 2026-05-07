import { AppDataSource } from "DataSource";
import { Injectable } from "@nestjs/common";
import { ActivityLog } from "typeorm/entities/ActivityLog";

@Injectable()
export class ActivityLogService {
  async log(data: {
    userId: string;
    action: string;
    status: number;
    details?: string;
  }) {
    return await AppDataSource.getRepository(ActivityLog)
      .createQueryBuilder("activity_log")
      .insert()
      .values(data)
      .execute();
  }

  async findByUser(userId: string) {
    return await AppDataSource.getRepository(ActivityLog)
      .createQueryBuilder("activity_log")
      .where("activity_log.user_id = :id", { userId })
      .getOne();
  }

  async findAll(session) {
  return await AppDataSource.getRepository(ActivityLog)
    .createQueryBuilder("activity_log")
    .leftJoinAndSelect("activity_log.user", "user")
    .leftJoinAndSelect("user.role", "role")
    .leftJoinAndSelect("user.team", "team")
    .where('team.company_id = :companyId', { companyId: session.companyId })
    .orderBy("activity_log.createdAt", "DESC")
    .getMany();
}

  async findOne(id: string): Promise<ActivityLog | null> {
    return await AppDataSource.getRepository(ActivityLog)
      .createQueryBuilder("activity_log")
      .where("activity_log.id = :id", { id: id })
      .getOne();
  }
}
