import { Injectable, Search } from "@nestjs/common";
import { CreateActionDto } from "./dto/create-action.dto";
import { UpdateActionDto } from "./dto/update-action.dto";
import { AppDataSource } from "DataSource";
import { Action } from "typeorm/entities/Action";
import { User } from "typeorm/entities/User";
import { ActivityLogService } from "src/activity-log/activity-log.service";
import { ACTIVITY_FAIL } from "typeorm/entities/ActivityLog";
import { SUPER_ADMIN_ROLE_ID } from "typeorm/entities/Role";
import { Review } from "typeorm/entities/Review";

@Injectable()
export class ActionService {
  constructor(private readonly activityLogService: ActivityLogService) {}

  /**
   * Crée une nouvelle action.
   * @param createActionDto Données de l'action à créer
   * @param connectedUser Utilisateur connecté à l'origine de la création
   * @returns Résultat de la tentative de création
   */
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

  /**
   * Récupère la liste des actions selon des filtres optionnels.
   * @param filters Filtres à appliquer sur la recherche des actions
   * @param userId Identifiant de l'utilisateur connecté, utilisé pour déterminer les favoris
   * @returns Liste des actions correspondant aux filtres
   */
  async findAll(filters: Record<string, string>, userId?: string) {
    const EXACT_FILTERS = ["category_id", "format_id", "company_id", "speaker_id"];
    const TEXT_FILTERS = ["title", "price"];
    const RANGE_FILTERS = ["duration", "nb_attendees"];

    const query = AppDataSource.getRepository(Action)
      .createQueryBuilder("action")
      .leftJoin("action.category", "category")
      .leftJoin("action.format", "format")
      .select([
        "action.id",
        "action.title",
        "action.description",
        "action.duration",
        "action.nb_attendees",
        "category.id",
        "category.name",
        "format.id",
        "format.name",
      ]);

    if (userId) {
      query
        .leftJoin("action.favorites", "favorite", "favorite.user_id = :userId", { userId })
        .addSelect("favorite.user_id");
    }

    Object.keys(filters).forEach((property) => {
      const value = filters[property];

      if (property === "search") {
        query.andWhere(
          "(action.title ILIKE :search OR action.description ILIKE :search)",
          { search: `%${value}%` },
        );
      } else if (property === "keywords") {
        query.andWhere("action.keywords::text ILIKE :keywords", {
          keywords: `%${value}%`,
        });
      } else if (EXACT_FILTERS.includes(property)) {
        query.andWhere(`action.${property} = :${property}`, {
          [property]: value,
        });
      } else if (TEXT_FILTERS.includes(property)) {
        query.andWhere(`action.${property} ILIKE :${property}`, {
          [property]: `%${value}%`,
        });
      } else {
        const rangeMatch = RANGE_FILTERS.find(
          (field) =>
            property === `${field}_min` || property === `${field}_max`,
        );

        if (rangeMatch) {
          const isMin = property.endsWith("_min");
          const operator = isMin ? ">=" : "<=";
          const paramName = property;

          query.andWhere(`action.${rangeMatch} ${operator} :${paramName}`, {
            [paramName]: Number(value),
          });
        }
      }
    });

    const actions = await query.getMany();

    return actions.map((action) => ({
      ...action,
      isFavorite: userId ? !!(action as any).favorite : undefined,
    }));
  }

  /**
   * Récupère une action brute par son identifiant, sans jointures ni enrichissement.
   * @param id Identifiant de l'action
   * @returns Action correspondante ou null si elle n'existe pas
   */
  async findOneRaw(id: string): Promise<Action | null> {
    return await AppDataSource.getRepository(Action)
      .createQueryBuilder("action")
      .where("action.id = :id", { id })
      .getOne();
  }

  /**
   * Récupère une action par son identifiant, enrichie de ses statistiques d'avis.
   * @param id Identifiant de l'action
   * @param userId Identifiant de l'utilisateur connecté, utilisé pour déterminer le favori
   * @returns Action correspondante avec ses statistiques, ou null si elle n'existe pas
   */
  async findOne(id: string, userId?: string) {
    const query = AppDataSource.getRepository(Action)
      .createQueryBuilder("action")
      .leftJoin("action.category", "category")
      .leftJoin("action.format", "format")
      .leftJoin("action.speaker", "speaker")
      .select([
        "action.id",
        "action.title",
        "action.description",
        "action.planification",
        "action.duration",
        "action.nb_attendees",
        "action.price",
        "category.id",
        "category.name",
        "format.id",
        "format.name",
        "speaker.id",
        "speaker.first_name",
        "speaker.last_name",
        "speaker.job",
        "speaker.email",
        "speaker.phone",
      ])
      .where("action.id = :id", { id });

    if (userId) {
      query
        .leftJoin("action.favorites", "favorite", "favorite.user_id = :userId", { userId })
        .addSelect("favorite.user_id");
    }

    const action = await query.getOne();

    if (!action) {
      return null;
    }

    const ratingStats = await AppDataSource.getRepository(Review)
      .createQueryBuilder("review")
      .select("AVG(review.grade)", "average")
      .addSelect("COUNT(review.id)", "count")
      .where("review.available_action_id = :id", { id })
      .getRawOne();

    return {
      ...action,
      isFavorite: userId ? !!(action as any).favorite : undefined,
      averageRating: ratingStats?.average
        ? Number(parseFloat(ratingStats.average).toFixed(1))
        : null,
      reviewsCount: ratingStats?.count ? Number(ratingStats.count) : 0,
    };
  }

  /**
   * Met à jour une action existante.
   * @param id Identifiant de l'action à mettre à jour
   * @param updateActionDto Données de mise à jour de l'action
   * @param connectedUser Utilisateur connecté à l'origine de la mise à jour
   * @returns Résultat de la tentative de mise à jour
   */
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

  /**
   * Supprime une action.
   * @param id Identifiant de l'action à supprimer
   * @param connectedUser Utilisateur connecté à l'origine de la suppression
   * @returns Résultat de la tentative de suppression
   */
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