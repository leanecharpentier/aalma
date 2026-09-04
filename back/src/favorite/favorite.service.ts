import { Injectable } from "@nestjs/common";
import { AppDataSource } from "DataSource";
import { Favorite } from "typeorm/entities/Favorite";
import { CreateFavoriteDto } from "./dto/create-favorite.dto";

@Injectable()
export class FavoriteService {
  /**
   * Crée un favori pour un utilisateur.
   * @param dto Données du favori à créer
   * @param userId Identifiant de l'utilisateur
   * @returns Résultat de la création du favori
   */
  async create(dto: CreateFavoriteDto, userId: string) {
    try {
      return await AppDataSource.getRepository(Favorite)
        .createQueryBuilder()
        .insert()
        .values({ user_id: userId, available_action_id: dto.available_action_id })
        .execute();
    } catch (e) {
      return { success: false, message: e.detail };
    }
  }

  /**
   * Récupère tous les favoris d'un utilisateur.
   * @param userId Identifiant de l'utilisateur
   * @returns Liste des favoris de l'utilisateur
   */
  async findAllForUser(userId: string) {
    return await AppDataSource.getRepository(Favorite)
      .createQueryBuilder("favorite")
      .leftJoinAndSelect("favorite.action", "action")
      .where("favorite.user_id = :userId", { userId })
      .getMany();
  }

  /**
   * Supprime un favori d'un utilisateur.
   * @param availableActionId Identifiant de l'action disponible
   * @param userId Identifiant de l'utilisateur
   * @returns Résultat de la suppression du favori
   */
  async remove(availableActionId: string, userId: string) {
    return await AppDataSource.getRepository(Favorite)
      .createQueryBuilder()
      .delete()
      .where("user_id = :userId AND available_action_id = :availableActionId", {
        userId,
        availableActionId,
      })
      .execute();
  }
}