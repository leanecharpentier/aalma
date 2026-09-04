import { AppDataSource } from "DataSource";
import { Injectable } from "@nestjs/common";
import { ActivityLog } from "typeorm/entities/ActivityLog";

@Injectable()
export class ActivityLogService {
  /**
   * Enregistre une nouvelle entrée dans le journal d'activité.
   * @param data Données de l'entrée à journaliser
   * @returns Résultat de la tentative d'enregistrement
   */
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

  /**
   * Récupère une entrée du journal d'activité pour un utilisateur donné.
   * @param userId Identifiant de l'utilisateur
   * @returns Entrée du journal correspondante
   */
  async findByUser(userId: string) {
    return await AppDataSource.getRepository(ActivityLog)
      .createQueryBuilder("activity_log")
      .where("activity_log.user_id = :id", { userId })
      .getOne();
  }

  /**
   * Récupère l'ensemble des entrées du journal d'activité, triées par date de création décroissante.
   * @returns Liste des entrées du journal
   */
  async findAll() {
    return await AppDataSource.getRepository(ActivityLog)
      .createQueryBuilder("activity_log")
      .leftJoinAndSelect("activity_log.user", "user")
      .leftJoinAndSelect("user.role", "role")
      .orderBy("activity_log.createdAt", "DESC")
      .getMany();
  }

  /**
   * Récupère une entrée du journal d'activité par son identifiant.
   * @param id Identifiant de l'entrée
   * @returns Entrée correspondante ou null si elle n'existe pas
   */
  async findOne(id: string): Promise<ActivityLog | null> {
    return await AppDataSource.getRepository(ActivityLog)
      .createQueryBuilder("activity_log")
      .where("activity_log.id = :id", { id: id })
      .getOne();
  }
}