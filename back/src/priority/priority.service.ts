import { Injectable, NotFoundException } from "@nestjs/common";
import { AppDataSource } from "DataSource";
import { Priority } from "typeorm/entities/Priority";
import { Roadmap } from "typeorm/entities/Rodmap";


@Injectable()
export class PriorityService {
  /**
   * Récupère les priorités d'une roadmap d'équipe ou de la roadmap globale.
   * @param teamId Identifiant de l'équipe
   * @returns Liste des priorités associées à la roadmap
   */
  async findAll(teamId?: string) {
    const roadmapRepo = AppDataSource.getRepository(Roadmap);

    const roadmapQuery = roadmapRepo.createQueryBuilder("roadmap");

    if (teamId) {
      roadmapQuery.where("roadmap.team_id = :teamId", { teamId });
    } else {
      roadmapQuery.where("roadmap.team_id IS NULL");
    }

    const roadmap = await roadmapQuery.getOne();

    if (!roadmap) {
      throw new NotFoundException(
        teamId
          ? "Aucune roadmap trouvée pour cette équipe"
          : "Aucune roadmap globale trouvée",
      );
    }

    return await AppDataSource.getRepository(Priority)
      .createQueryBuilder("priority")
      .select(["priority.id", "priority.memo"])
      .where("priority.roadmap_id = :roadmapId", { roadmapId: roadmap.id })
      .getMany();
  }
}