import { AppDataSource } from "DataSource";
import { Injectable } from "@nestjs/common";
import { Role } from "typeorm/entities/Role";

@Injectable()
export class RoleService {
  /**
   * Récupère la liste de tous les rôles avec le nombre d'utilisateurs associés.
   * @returns Liste des rôles avec leur nombre d'utilisateurs
   */
  async findAll() {
    return await AppDataSource.getRepository(Role)
      .createQueryBuilder("role")
      .loadRelationCountAndMap("role.userCount", "role.users")
      .getMany();
  }

  /**
   * Récupère un rôle à partir de son identifiant.
   * @param id Identifiant du rôle
   * @returns Rôle correspondant à l'identifiant
   */
  async findOne(id: string) {
    return await AppDataSource.getRepository(Role)
      .createQueryBuilder("role")
      .where("role.id = :id", { id })
      .getOne();
  }

  /**
   * Récupère un rôle avec les utilisateurs qui lui sont associés.
   * @param id Identifiant du rôle
   * @returns Rôle avec la liste des utilisateurs associés
   */
  async findEmployees(id: string) {
    return await AppDataSource.getRepository(Role)
      .createQueryBuilder("role")
      .leftJoinAndSelect("role.users", "user")
      .where("role.id = :id", { id })
      .getOne();
  }
}