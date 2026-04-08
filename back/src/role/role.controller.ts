import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { RoleService } from "./role.service";
import { AuthGuard } from "src/auth/auth.guard";
import { RolesGuard } from "./roles.guards";
import { Roles } from "./role.decorator";
import { ADMIN_ROLE_ID, SUPER_ADMIN_ROLE_ID } from "typeorm/entities/Role";

@Controller("role")
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles([SUPER_ADMIN_ROLE_ID, ADMIN_ROLE_ID])
  findAll() {
    return this.roleService.findAll();
  }

  @Get(":id")
  @UseGuards(AuthGuard, RolesGuard)
  @Roles([SUPER_ADMIN_ROLE_ID, ADMIN_ROLE_ID])
  findOne(@Param("id") id: string) {
    return this.roleService.findOne(id);
  }

  @Get(":id/employees")
  @UseGuards(AuthGuard, RolesGuard)
  @Roles([SUPER_ADMIN_ROLE_ID, ADMIN_ROLE_ID])
  findEmployees(@Param("id") id: string) {
    return this.roleService.findEmployees(id);
  }
}
