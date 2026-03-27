import { AppDataSource } from "DataSource";
import { Injectable } from "@nestjs/common";
import { Role } from "typeorm/entities/Role";

@Injectable()
export class RoleService {
  async findAll() {
    return await AppDataSource.getRepository(Role)
      .createQueryBuilder("role")
      .loadRelationCountAndMap("role.userCount", "role.users")
      .getMany();
  }

  async findOne(id: string) {
    return await AppDataSource.getRepository(Role)
      .createQueryBuilder("role")
      .where("role.id = :id", { id })
      .getOne();
  }

  async findEmployees(id: string) {
    return await AppDataSource.getRepository(Role)
      .createQueryBuilder("role")
      .leftJoinAndSelect("role.users", "user")
      .where("role.id = :id", { id })
      .getOne();
  }
}
