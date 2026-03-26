import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";
import { ActivityLogService } from "src/activity-log/activity-log.service";
import { AuthGuard } from "src/auth/auth.guard";
import { Roles } from "src/role/role.decorator";
import { RolesGuard } from "src/role/roles.guards";
import { ACTIVITY_SUCCESS } from "typeorm/entities/ActivityLog";
import {
  ADMIN_ROLE_ID,
  HR_ROLE_ID,
  SUPER_ADMIN_ROLE_ID,
} from "typeorm/entities/Role";
import { CreatePropositionDto } from "./dto/create-proposition.dto";
import { UpdatePropositionDto } from "./dto/update-proposition.dto";
import { PropositionService } from "./proposition.service";

@Controller("proposition")
export class PropositionController {
  constructor(
    private readonly propositionService: PropositionService,
    private readonly activityLogService: ActivityLogService,
  ) {}

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles([SUPER_ADMIN_ROLE_ID])
  async create(@Req() req, @Body() createPropositionDto: CreatePropositionDto) {
    const connectedUser = (req as any).user;
    const result = await this.propositionService.create(
      createPropositionDto,
      connectedUser,
    );
    if (!("success" in result && result.success === false)) {
      this.activityLogService.log({
        userId: connectedUser.id,
        action: "proposition.created",
        status: ACTIVITY_SUCCESS,
      });
    }
    return result;
  }

  @Get(":id")
  @UseGuards(AuthGuard, RolesGuard)
  @Roles([SUPER_ADMIN_ROLE_ID, ADMIN_ROLE_ID, HR_ROLE_ID])
  async findOne(@Param("id") id: string) {
    return await this.propositionService.findOne(+id);
  }

  @Patch(":id")
  @UseGuards(AuthGuard, RolesGuard)
  @Roles([SUPER_ADMIN_ROLE_ID])
  async update(
    @Req() req,
    @Param("id") id: string,
    @Body() updatePropositionDto: UpdatePropositionDto,
  ) {
    const connectedUser = (req as any).user;
    const result = await this.propositionService.update(
      +id,
      updatePropositionDto,
      connectedUser,
    );
    if (!("success" in result && result.success === false)) {
      this.activityLogService.log({
        userId: connectedUser.id,
        action: "proposition.updated",
        status: ACTIVITY_SUCCESS,
      });
    }
    return result;
  }

  @Delete(":id")
  @UseGuards(AuthGuard, RolesGuard)
  @Roles([SUPER_ADMIN_ROLE_ID])
  async remove(@Req() req, @Param("id") id: string) {
    const connectedUser = (req as any).user;
    const result = await this.propositionService.remove(+id, connectedUser);
    if (!("success" in result && result.success === false)) {
      this.activityLogService.log({
        userId: connectedUser.id,
        action: "proposition.deleted",
        status: ACTIVITY_SUCCESS,
      });
    }
    return result;
  }
}
