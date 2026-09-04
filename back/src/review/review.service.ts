import { Injectable } from "@nestjs/common";
import { AppDataSource } from "DataSource";
import { Review } from "typeorm/entities/Review";
import { CreateReviewDto } from "./dto/create-review.dto";
import { UpdateReviewDto } from "./dto/update-review.dto";

@Injectable()
export class ReviewService {
  /**
   * Crée un nouvel avis pour un utilisateur.
   * @param dto Données de l'avis à créer
   * @param userId Identifiant de l'utilisateur
   * @returns Résultat de la création de l'avis
   */
  async create(dto: CreateReviewDto, userId: string) {
    try {
      return await AppDataSource.getRepository(Review)
        .createQueryBuilder()
        .insert()
        .values({ ...dto, user_id: userId })
        .execute();
    } catch (e) {
      return { success: false, message: e.detail };
    }
  }

  /**
   * Récupère tous les avis associés à une action disponible.
   * @param availableActionId Identifiant de l'action disponible
   * @returns Liste des avis associés à l'action
   */
  async findAllForAction(availableActionId: string) {
    return await AppDataSource.getRepository(Review)
      .createQueryBuilder("review")
      .leftJoinAndSelect("review.user", "user")
      .where("review.available_action_id = :availableActionId", { availableActionId })
      .getMany();
  }

  /**
   * Met à jour un avis appartenant à l'utilisateur.
   * @param id Identifiant de l'avis
   * @param dto Données de l'avis à mettre à jour
   * @param userId Identifiant de l'utilisateur
   * @returns Résultat de la mise à jour de l'avis
   */
  async update(id: string, dto: UpdateReviewDto, userId: string) {
    return await AppDataSource.getRepository(Review)
      .createQueryBuilder()
      .update()
      .set(dto)
      .where("id = :id AND user_id = :userId", { id, userId }) // seul l'auteur peut modifier
      .execute();
  }

  /**
   * Supprime un avis appartenant à l'utilisateur.
   * @param id Identifiant de l'avis
   * @param userId Identifiant de l'utilisateur
   * @returns Résultat de la suppression de l'avis
   */
  async remove(id: string, userId: string) {
    return await AppDataSource.getRepository(Review)
      .createQueryBuilder()
      .delete()
      .where("id = :id AND user_id = :userId", { id, userId })
      .execute();
  }
}