import { Controller, Get, UseGuards } from "@nestjs/common";
import { AppDataSource } from "DataSource";
import { AuthGuard } from "src/auth/auth.guard";
import { Roles } from "src/role/role.decorator";
import { RolesGuard } from "src/role/roles.guards";
import { Category } from "typeorm/entities/Category";
import {
  ADMIN_ROLE_ID,
  CEO_ROLE_ID,
  HEALTH_REFEREE_ROLE_ID,
  HR_ROLE_ID,
  MANAGER_ROLE_ID,
  SUPER_ADMIN_ROLE_ID,
} from "typeorm/entities/Role";

@Controller("category")
export class CategoryController {
  @Get()

  @UseGuards(AuthGuard, RolesGuard)
  @Roles([
    SUPER_ADMIN_ROLE_ID,
    ADMIN_ROLE_ID,
    HR_ROLE_ID,
    CEO_ROLE_ID,
    MANAGER_ROLE_ID,
    HEALTH_REFEREE_ROLE_ID,
  ])
  async findAll() {
    return await AppDataSource.getRepository(Category)
      .createQueryBuilder("action")
      .getMany();
  }
}
