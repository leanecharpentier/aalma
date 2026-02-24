import { Injectable } from "@nestjs/common";
import { CreateTeamDto } from "./dto/create-team.dto";
import { UpdateTeamDto } from "./dto/update-team.dto";
import { AppDataSource } from "DataSource";
import { Team } from "typeorm/entities/Team";
import { InsertResult } from "typeorm";
import { UpdateResult } from "typeorm/browser";
import { DeleteResult } from "typeorm/browser";

@Injectable()
export class TeamService {
  /**
   * Create a new team in the database.
   * @param createTeamDto CreateTeamDto data to create a new team
   * @returns Promise<InsertResult>
   */
  async create(createTeamDto: CreateTeamDto): Promise<InsertResult> {
    return await AppDataSource.getRepository(Team)
      .createQueryBuilder("team")
      .insert()
      .values(createTeamDto)
      .execute();
  }

  /**
   * Get all teams in the database.
   * @returns Promise<Team[]>
   */
  async findAll(): Promise<Team[]> {
    return await AppDataSource.getRepository(Team)
      .createQueryBuilder("team")
      .getMany();
  }

  /**
   * Get one team with the given id.
   * @param id number id of the team to get
   * @returns Promise<Team | null>
   */
  async findOne(id: number): Promise<Team | null> {
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
  async findEmployees(id: number): Promise<Team | null> {
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
    id: number,
    updateTeamDto: UpdateTeamDto,
  ): Promise<UpdateResult> {
    return await AppDataSource.getRepository(Team)
      .createQueryBuilder("team")
      .update()
      .set(updateTeamDto)
      .where("team.id = :id", { id })
      .execute();
  }

  /**
   * Delete a team with the given id.
   * @param id number id of the team to delete
   * @returns Promise<DeleteResult>
   */
  async remove(id: number): Promise<DeleteResult> {
    return await AppDataSource.getRepository(Team)
      .createQueryBuilder("team")
      .delete()
      .where("team.id = :id", { id })
      .execute();
  }
}
