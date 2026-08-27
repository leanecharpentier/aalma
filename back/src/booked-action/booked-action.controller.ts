import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, Req } from "@nestjs/common";
import { CreateBookedActionDto } from "./dto/create-booked-action.dto";
import { UpdateBookedActionDto } from "./dto/update-booked-action.dto";
import { BookedActionService } from "./booked-action.service";
import { AuthGuard } from "src/auth/auth.guard";
import { RolesGuard } from "src/role/roles.guards";
import { Roles } from "src/role/role.decorator";
import {
  ADMIN_ROLE_ID,
  CEO_ROLE_ID,
  HR_ROLE_ID,
  MANAGER_ROLE_ID,
  SUPER_ADMIN_ROLE_ID,
} from "typeorm/entities/Role";
import { ActivityLogService } from "src/activity-log/activity-log.service";
import { ACTIVITY_SUCCESS } from "typeorm/entities/ActivityLog";

@Controller("booked-action")
export class BookedActionController {
  constructor(
    private readonly bookedActionService: BookedActionService,
    private readonly activityLogService: ActivityLogService,
  ) {}

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles([SUPER_ADMIN_ROLE_ID, ADMIN_ROLE_ID, HR_ROLE_ID, CEO_ROLE_ID, MANAGER_ROLE_ID])
  async create(@Body() dto: CreateBookedActionDto, @Req() req) {
    const connectedUser = (req as any).user;
    const result = await this.bookedActionService.create(dto, connectedUser);
    if (!("success" in result && result.success === false)) {
      this.activityLogService.log({
        userId: connectedUser.id,
        action: "booked_action.created",
        status: ACTIVITY_SUCCESS,
      });
    }
    return result;
  }

  @Get()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles([SUPER_ADMIN_ROLE_ID, ADMIN_ROLE_ID, HR_ROLE_ID, CEO_ROLE_ID, MANAGER_ROLE_ID])
  async findAll(@Query() filters: Record<string, string>) {
    return await this.bookedActionService.findAll(filters);
  }

  @Get(":id")
  @UseGuards(AuthGuard, RolesGuard)
  @Roles([SUPER_ADMIN_ROLE_ID, ADMIN_ROLE_ID, HR_ROLE_ID, CEO_ROLE_ID, MANAGER_ROLE_ID])
  async findOne(@Param("id") id: string) {
    return await this.bookedActionService.findOne(id);
  }

  @Patch(":id")
  @UseGuards(AuthGuard, RolesGuard)
  @Roles([SUPER_ADMIN_ROLE_ID, ADMIN_ROLE_ID, HR_ROLE_ID, CEO_ROLE_ID, MANAGER_ROLE_ID])
  async update(@Param("id") id: string, @Body() dto: UpdateBookedActionDto, @Req() req) {
    const connectedUser = (req as any).user;
    const result = await this.bookedActionService.update(id, dto, connectedUser);
    if (!("success" in result && result.success === false)) {
      this.activityLogService.log({
        userId: connectedUser.id,
        action: "booked_action.updated",
        status: ACTIVITY_SUCCESS,
      });
    }
    return result;
  }

  @Delete(":id")
  @UseGuards(AuthGuard, RolesGuard)
  @Roles([SUPER_ADMIN_ROLE_ID, ADMIN_ROLE_ID])
  async remove(@Param("id") id: string, @Req() req) {
    const connectedUser = (req as any).user;
    const result = await this.bookedActionService.remove(id, connectedUser);
    if (!("success" in result && result.success === false)) {
      this.activityLogService.log({
        userId: connectedUser.id,
        action: "booked_action.deleted",
        status: ACTIVITY_SUCCESS,
      });
    }
    return result;
  }
  @Get("roadmap/:roadmapId/next")
  @UseGuards(AuthGuard, RolesGuard)
  @Roles([SUPER_ADMIN_ROLE_ID, ADMIN_ROLE_ID, HR_ROLE_ID, CEO_ROLE_ID, MANAGER_ROLE_ID])
  async findNextByRoadmap(@Param("roadmapId") roadmapId: string) {
    return await this.bookedActionService.findNextByRoadmap(roadmapId, 2);
  }
}