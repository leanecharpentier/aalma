import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { ActivityLogService } from "./activity-log.service";
import { AuthGuard } from "src/auth/auth.guard";
import { RolesGuard } from "src/role/roles.guards";
import { Roles } from "src/role/role.decorator";

@Controller("activity-log")
export class ActivityLogController {
  constructor(private readonly activityLogService: ActivityLogService) {}

  @Get()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(["Super Admin", "Admin"])
  findAll() {
    return this.activityLogService.findAll();
  }

  @Get(":id")
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(["Super Admin", "Admin"])
  findOne(@Param("id") id: string) {
    return this.activityLogService.findOne(id);
  }
}
