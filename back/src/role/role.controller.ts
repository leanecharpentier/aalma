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

@Controller("role")
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(["Super Admin", "Admin"])
  findAll() {
    return this.roleService.findAll();
  }

  @Get(":id")
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(["Super Admin", "Admin"])
  findOne(@Param("id") id: string) {
    return this.roleService.findOne(+id);
  }

  @Get(":id/employees")
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(["Super Admin", "Admin"])
  findEmployees(@Param("id") id: string) {
    return this.roleService.findEmployees(+id);
  }
}
