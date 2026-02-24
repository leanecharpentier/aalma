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

@Controller("role")
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.roleService.findAll();
  }

  @Get(":id")
  @UseGuards(AuthGuard)
  findOne(@Param("id") id: string) {
    return this.roleService.findOne(+id);
  }

  @Get(":id/employees")
  @UseGuards(AuthGuard)
  findEmployees(@Param("id") id: string) {
    return this.roleService.findEmployees(+id);
  }
}
