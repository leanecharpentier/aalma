import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from "@nestjs/common";
import { TeamService } from "./team.service";
import { CreateTeamDto } from "./dto/create-team.dto";
import { UpdateTeamDto } from "./dto/update-team.dto";
import { AuthGuard } from "src/auth/auth.guard";
import { RolesGuard } from "src/role/roles.guards";
import { Roles } from "src/role/role.decorator";
import { ActivityLogService } from "src/activity-log/activity-log.service";
import { ACTIVITY_SUCCESS } from "typeorm/entities/ActivityLog";

@Controller("team")
export class TeamController {
  constructor(
    private readonly teamService: TeamService,
    private readonly activityLogService: ActivityLogService,
  ) {}

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(["Super Admin", "Admin"])
  async create(@Req() req, @Body() createTeamDto: CreateTeamDto) {
    const connectedUser = (req as any).user;
    const result = await this.teamService.create(createTeamDto, connectedUser);
    if (!("success" in result && result.success === false)) {
      this.activityLogService.log({
        userId: connectedUser.id,
        action: "team.created",
        status: ACTIVITY_SUCCESS,
      });
    }
    return result;
  }

  @Get()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(["Super Admin", "Admin", "HR"])
  findAll() {
    return this.teamService.findAll();
  }

  @Get(":id")
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(["Super Admin", "Admin", "CEO", "HR", "Manager"])
  findOne(@Param("id") id: string) {
    return this.teamService.findOne(+id);
  }

  @Get(":id/employees")
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(["Super Admin", "Admin", "HR"])
  findEmployees(@Param("id") id: string) {
    return this.teamService.findEmployees(+id);
  }

  @Patch(":id")
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(["Super Admin", "Admin"])
  async update(
    @Req() req,
    @Param("id") id: string,
    @Body() updateTeamDto: UpdateTeamDto,
  ) {
    const connectedUser = (req as any).user;
    const result = await this.teamService.update(
      +id,
      updateTeamDto,
      connectedUser,
    );
    if (!("success" in result && result.success === false)) {
      this.activityLogService.log({
        userId: connectedUser.id,
        action: "team.updated",
        status: ACTIVITY_SUCCESS,
      });
    }
    return result;
  }

  @Delete(":id")
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(["Super Admin", "Admin"])
  async remove(@Req() req, @Param("id") id: string) {
    const connectedUser = (req as any).user;
    const result = await this.teamService.remove(+id, connectedUser);
    if (!("success" in result && result.success === false)) {
      this.activityLogService.log({
        userId: connectedUser.id,
        action: "team.deleted",
        status: ACTIVITY_SUCCESS,
      });
    }
    return result;
  }
}
