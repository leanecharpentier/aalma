import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/auth/auth.guard";
import { RolesGuard } from "src/role/roles.guards";
import { Roles } from "src/role/role.decorator";
import {
  SUPER_ADMIN_ROLE_ID,
  ADMIN_ROLE_ID,
  HR_ROLE_ID,
  CEO_ROLE_ID,
  MANAGER_ROLE_ID,
  HEALTH_REFEREE_ROLE_ID,
} from "typeorm/entities/Role";
import { PriorityService } from "./priority.service";

@Controller("priority")
export class PriorityController {
  constructor(private readonly priorityService: PriorityService) {}

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
  async findAll(@Query("team_id") teamId?: string) {
    return await this.priorityService.findAll(teamId);
  }
}