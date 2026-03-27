import { AppDataSource } from "DataSource";
import { Injectable } from "@nestjs/common";
import { ActivityLogService } from "src/activity-log/activity-log.service";
import { InsertResult } from "typeorm";
import { DeleteResult, UpdateResult } from "typeorm/browser";
import { ACTIVITY_FAIL } from "typeorm/entities/ActivityLog";
import { Team } from "typeorm/entities/Team";
import { User } from "typeorm/entities/User";
import { CreateTeamDto } from "./dto/create-team.dto";
import { GetTeamsDto } from "./dto/get-teams.dto";
import { UpdateTeamDto } from "./dto/update-team.dto";

@Injectable()
export class TeamService {
  constructor(private readonly activityLogService: ActivityLogService) {}

  /**
   * Create a new team in the database.
   * @param createTeamDto CreateTeamDto data to create a new team
   * @returns Promise<InsertResult>
   */
  async create(
    createTeamDto: CreateTeamDto,
    connectedUser: User,
  ): Promise<InsertResult | { success: boolean; message: string }> {
    try {
      const existingTeam = await AppDataSource.getRepository(Team)
        .createQueryBuilder("team")
        .where("team.name = :name AND team.company_id = :company_id", {
          name: createTeamDto.name,
          company_id: createTeamDto.company_id,
        })
        .getOne();
      if (!existingTeam) {
        return await AppDataSource.getRepository(Team)
          .createQueryBuilder("team")
          .insert()
          .values(createTeamDto)
          .execute();
      } else {
        this.activityLogService.log({
          userId: connectedUser.id,
          action: "team.created",
          status: ACTIVITY_FAIL,
          details: `Team ${createTeamDto.name} already exists in this company`,
        });
        return {
          success: false,
          message: `Team ${createTeamDto.name} already exists in this company`,
        };
      }
    } catch (e) {
      this.activityLogService.log({
        userId: connectedUser.id,
        action: "team.created",
        status: ACTIVITY_FAIL,
        details: e.detail,
      });
      return { success: false, message: e.detail };
    }
  }

  /**
   * Get all teams in the database.
   * @returns Promise<Team[]>
   */
  async findAll(getTeamsDto?: GetTeamsDto): Promise<Team[]> {
    const { company_id } = getTeamsDto ?? {};
    const qb = AppDataSource.getRepository(Team).createQueryBuilder("team");
    if (company_id) {
      qb.where("team.company_id = :company_id", { company_id });
    }
    return qb.getMany();
  }

  /**
   * Get one team with the given id.
   * @param id number id of the team to get
   * @returns Promise<Team | null>
   */
  async findOne(id: string): Promise<Team | null> {
    return await AppDataSource.getRepository(Team)
      .createQueryBuilder("team")
      .where("team.id = :id", { id })
      .getOne();
  }

  /**
   * Get all employees of a team with the given id.
   * @param id number id of the team to get employees of
   * @returns Promise<Team | null>
   */
  async findEmployees(id: string): Promise<Team | null> {
    return await AppDataSource.getRepository(Team)
      .createQueryBuilder("team")
      .leftJoinAndSelect("team.users", "user")
      .where("team.id = :id", { id })
      .getOne();
  }

  /**
   * Update a team with the given id.
   * @param id number id of the team to update
   * @param updateTeamDto UpdateTeamDto data to update the team with
   * @returns Promise<UpdateResult>
   */
  async update(
    id: string,
    updateTeamDto: UpdateTeamDto,
    connectedUser: User,
  ): Promise<UpdateResult | { success: boolean; message: string }> {
    try {
      return await AppDataSource.getRepository(Team)
        .createQueryBuilder("team")
        .update()
        .set(updateTeamDto)
        .where("team.id = :id", { id })
        .execute();
    } catch (e) {
      this.activityLogService.log({
        userId: connectedUser.id,
        action: "team.updated",
        status: ACTIVITY_FAIL,
        details: e.detail,
      });
      return { success: false, message: e.detail };
    }
  }

  /**
   * Delete a team with the given id.
   * @param id number id of the team to delete
   * @returns Promise<DeleteResult>
   */
  async remove(
    id: string,
    connectedUser: User,
  ): Promise<DeleteResult | { success: boolean; message: string }> {
    try {
      return await AppDataSource.getRepository(Team)
        .createQueryBuilder("team")
        .delete()
        .where("team.id = :id", { id })
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
