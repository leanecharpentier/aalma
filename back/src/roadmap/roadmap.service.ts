import { Injectable } from "@nestjs/common";
import { AppDataSource } from "DataSource";
import { CreateRoadmapDto } from "./dto/create-roadmap.dto";
import { UpdateRoadmapDto } from "./dto/update-roadmap.dto";
import { Roadmap } from "typeorm/entities/Rodmap";

@Injectable()
export class RoadmapService {
  /**
   * Crée une nouvelle roadmap.
   * @param dto Données de la roadmap à créer
   * @returns Résultat de la création de la roadmap
   */
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

  /**
   * Récupère toutes les roadmaps associées à une équipe.
   * @param teamId Identifiant de l'équipe
   * @returns Liste des roadmaps de l'équipe
   */
  async findAllForTeam(teamId: string) {
    return await AppDataSource.getRepository(Roadmap)
      .createQueryBuilder("roadmap")
      .where("roadmap.team_id = :teamId", { teamId })
      .getMany();
  }

  /**
   * Récupère une roadmap avec l'équipe associée.
   * @param id Identifiant de la roadmap
   * @returns Roadmap correspondante avec son équipe
   */
  async findOne(id: string) {
    return await AppDataSource.getRepository(Roadmap)
      .createQueryBuilder("roadmap")
      .leftJoinAndSelect("roadmap.team", "team")
      .where("roadmap.id = :id", { id })
      .getOne();
  }

  /**
   * Met à jour une roadmap existante.
   * @param id Identifiant de la roadmap
   * @param dto Données de la roadmap à mettre à jour
   * @returns Résultat de la mise à jour de la roadmap
   */
  async update(id: string, dto: UpdateRoadmapDto) {
    return await AppDataSource.getRepository(Roadmap)
      .createQueryBuilder()
      .update()
      .set(dto)
      .where("id = :id", { id })
      .execute();
  }

  /**
   * Supprime une roadmap existante.
   * @param id Identifiant de la roadmap
   * @returns Résultat de la suppression de la roadmap
   */
  async remove(id: string) {
    return await AppDataSource.getRepository(Roadmap)
      .createQueryBuilder()
      .delete()
      .where("id = :id", { id })
      .execute();
  }
}