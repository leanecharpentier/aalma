import { Injectable } from "@nestjs/common";
import { AppDataSource } from "DataSource";
import { CreateRoadmapDto } from "./dto/create-roadmap.dto";
import { UpdateRoadmapDto } from "./dto/update-roadmap.dto";
import { Roadmap } from "typeorm/entities/Rodmap";

@Injectable()
export class RoadmapService {
  async create(dto: CreateRoadmapDto) {
    try {
      return await AppDataSource.getRepository(Roadmap)
        .createQueryBuilder()
        .insert()
        .values(dto)
        .execute();
    } catch (e) {
      return { success: false, message: e.detail };
    }
  }

  async findAllForTeam(teamId: string) {
    return await AppDataSource.getRepository(Roadmap)
      .createQueryBuilder("roadmap")
      .where("roadmap.team_id = :teamId", { teamId })
      .getMany();
  }

  async findOne(id: string) {
    return await AppDataSource.getRepository(Roadmap)
      .createQueryBuilder("roadmap")
      .leftJoinAndSelect("roadmap.team", "team")
      .where("roadmap.id = :id", { id })
      .getOne();
  }

  async update(id: string, dto: UpdateRoadmapDto) {
    return await AppDataSource.getRepository(Roadmap)
      .createQueryBuilder()
      .update()
      .set(dto)
      .where("id = :id", { id })
      .execute();
  }

  async remove(id: string) {
    return await AppDataSource.getRepository(Roadmap)
      .createQueryBuilder()
      .delete()
      .where("id = :id", { id })
      .execute();
  }
}