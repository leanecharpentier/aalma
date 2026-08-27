import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  Req,
} from "@nestjs/common";
import { CreateActionDto } from "./dto/create-action.dto";
import { UpdateActionDto } from "./dto/update-action.dto";
import { ActionService } from "./action.service";
import { AuthGuard } from "src/auth/auth.guard";
import { RolesGuard } from "src/role/roles.guards";
import { Roles } from "src/role/role.decorator";
import {
  ADMIN_ROLE_ID,
  CEO_ROLE_ID,
  HEALTH_REFEREE_ROLE_ID,
  HR_ROLE_ID,
  MANAGER_ROLE_ID,
  SUPER_ADMIN_ROLE_ID,
} from "typeorm/entities/Role";
import { ActivityLogService } from "src/activity-log/activity-log.service";
import { ACTIVITY_SUCCESS } from "typeorm/entities/ActivityLog";

@Controller("action")
export class ActionController {
  constructor(
    private readonly actionService: ActionService,
    private readonly activityLogService: ActivityLogService,
  ) {}

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles([SUPER_ADMIN_ROLE_ID])
  async create(@Body() createActionDto: CreateActionDto, @Req() req) {
    const connectedUser = (req as any).user;
    const result = await this.actionService.create(
      createActionDto,
      connectedUser,
    );
    if (!("success" in result && result.success === false)) {
      this.activityLogService.log({
        userId: connectedUser.id,
        action: "action.created",
        status: ACTIVITY_SUCCESS,
      });
    }
    return result;
  }

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
  async findAll(@Query() filters: Record<string, string>) {
    return await this.actionService.findAll(filters);
  }

  @Get(":id")
  @UseGuards(AuthGuard, RolesGuard)
  @Roles([
    SUPER_ADMIN_ROLE_ID,
    ADMIN_ROLE_ID,
    HR_ROLE_ID,
    CEO_ROLE_ID,
    MANAGER_ROLE_ID,
    HEALTH_REFEREE_ROLE_ID,
  ])
  async findOne(@Param("id") id: string) {
    return await this.actionService.findOne(id);
  }

  @Patch(":id")
  @UseGuards(AuthGuard, RolesGuard)
  @Roles([SUPER_ADMIN_ROLE_ID])
  async update(
    @Param("id") id: string,
    @Body() updateActionDto: UpdateActionDto,
    @Req() req,
  ) {
    const connectedUser = (req as any).user;
    const result = await this.actionService.update(
      id,
      updateActionDto,
      connectedUser,
    );
    if (!("success" in result && result.success === false)) {
      this.activityLogService.log({
        userId: connectedUser.id,
        action: "action.updated",
        status: ACTIVITY_SUCCESS,
      });
    }
    return result;
  }

  @Delete(":id")
  @UseGuards(AuthGuard, RolesGuard)
  @Roles([SUPER_ADMIN_ROLE_ID])
  async remove(@Param("id") id: string, @Req() req) {
    const connectedUser = (req as any).user;
    const result = await this.actionService.remove(id, connectedUser);
    if (!("success" in result && result.success === false)) {
      this.activityLogService.log({
        userId: connectedUser.id,
        action: "action.deleted",
        status: ACTIVITY_SUCCESS,
      });
    }
    return result;
  }
}
