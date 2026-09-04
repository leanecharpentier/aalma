import { Injectable } from "@nestjs/common";
import { AppDataSource } from "DataSource";
import { BookedAction } from "typeorm/entities/BookedAction";
import { User } from "typeorm/entities/User";
import { CreateBookedActionDto } from "./dto/create-booked-action.dto";
import { UpdateBookedActionDto } from "./dto/update-booked-action.dto";
import { ActivityLogService } from "src/activity-log/activity-log.service";
import { ACTIVITY_FAIL } from "typeorm/entities/ActivityLog";

@Injectable()
export class BookedActionService {
  constructor(private readonly activityLogService: ActivityLogService) {}

  /**
   * Crée une action réservée.
   * @param dto Données de l'action réservée à créer
   * @param connectedUser Utilisateur connecté
   * @returns Résultat de la création de l'action réservée
   */
  async create(dto: CreateBookedActionDto, connectedUser: User) {
    try {
      return await AppDataSource.getRepository(BookedAction)
        .createQueryBuilder("booked_action")
        .insert()
        .values(dto)
        .execute();
    } catch (e) {
      this.activityLogService.log({
        userId: connectedUser.id,
        action: "booked_action.created",
        status: ACTIVITY_FAIL,
        details: e.detail,
      });
      return { success: false, message: e.detail };
    }
  }

  /**
   * Récupère toutes les actions réservées selon les filtres fournis.
   * @param filters Filtres à appliquer à la recherche
   * @returns Liste des actions réservées correspondant aux filtres
   */
  async findAll(filters: Record<string, string>) {
    const ALLOWED_FILTERS = ["action_id", "priority_id"];
    const query = AppDataSource.getRepository(BookedAction)
      .createQueryBuilder("booked_action")
      .leftJoinAndSelect("booked_action.action", "action")
      .leftJoinAndSelect("booked_action.priority", "priority");

    Object.keys(filters).forEach((property) => {
      if (ALLOWED_FILTERS.includes(property)) {
        query.andWhere(`booked_action.${property} = :${property}`, {
          [property]: filters[property],
        });
      }
    });

    return await query.getMany();
  }

  /**
   * Récupère une action réservée à partir de son identifiant.
   * @param id Identifiant de l'action réservée
   * @returns L'action réservée correspondante
   */
  async findOne(id: string) {
    return await AppDataSource.getRepository(BookedAction)
      .createQueryBuilder("booked_action")
      .leftJoinAndSelect("booked_action.action", "action")
      .leftJoinAndSelect("booked_action.priority", "priority")
      .where("booked_action.id = :id", { id })
      .getOne();
  }

  /**
   * Met à jour une action réservée.
   * @param id Identifiant de l'action réservée à modifier
   * @param dto Nouvelles données de l'action réservée
   * @param connectedUser Utilisateur connecté
   * @returns Résultat de la mise à jour de l'action réservée
   */
  async update(id: string, dto: UpdateBookedActionDto, connectedUser: User) {
    try {
      return await AppDataSource.getRepository(BookedAction)
        .createQueryBuilder("booked_action")
        .update()
        .set(dto)
        .where("booked_action.id = :id", { id })
        .execute();
    } catch (e) {
      this.activityLogService.log({
        userId: connectedUser.id,
        action: "booked_action.updated",
        status: ACTIVITY_FAIL,
        details: e.detail,
      });
      return { success: false, message: e.detail };
    }
  }

  /**
   * Supprime une action réservée à partir de son identifiant.
   * @param id Identifiant de l'action réservée à supprimer
   * @param connectedUser Utilisateur connecté
   * @returns Résultat de la suppression de l'action réservée
   */
  async remove(id: string, connectedUser: User) {
    try {
      return await AppDataSource.getRepository(BookedAction)
        .createQueryBuilder("booked_action")
        .delete()
        .where("booked_action.id = :id", { id })
        .execute();
    } catch (e) {
      this.activityLogService.log({
        userId: connectedUser.id,
        action: "booked_action.deleted",
        status: ACTIVITY_FAIL,
        details: e.detail,
      });
      return { success: false, message: e.detail };
    }
  }

  /**
   * Récupère les prochaines actions réservées d'une roadmap.
   * @param roadmapId Identifiant de la roadmap
   * @param limit Nombre maximum d'actions à récupérer
   * @returns Liste des prochaines actions réservées de la roadmap
   */
  async findNextByRoadmap(roadmapId: string, limit = 2) {
    return await AppDataSource.getRepository(BookedAction)
      .createQueryBuilder("booked_action")
      .innerJoin(
        "booked_action.priority",
        "priority",
        "priority.roadmap_id = :roadmapId",
        { roadmapId },
      )
      .leftJoinAndSelect("booked_action.action", "action")
      .leftJoinAndSelect("booked_action.priority", "priorityDetails")
      .where("booked_action.startDate >= :now", { now: new Date() })
      .orderBy("booked_action.startDate", "ASC")
      .take(limit)
      .getMany();
  }
}