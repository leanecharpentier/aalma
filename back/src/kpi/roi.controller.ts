typeorm/entities/User.tsimport { Body, Controller, Param, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/auth/auth.guard";
import { RolesGuard } from "src/role/roles.guards";
import { Roles } from "src/role/role.decorator";
import {
  SUPER_ADMIN_ROLE_ID,
  ADMIN_ROLE_ID,
  HR_ROLE_ID,
  CEO_ROLE_ID,
  MANAGER_ROLE_ID,
} from "typeorm/entities/Role";
import { RoiService } from "./roi.service";

@Controller("kpi/roi")
export class RoiController {
  constructor(private readonly roiService: RoiService) {}

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles([
    SUPER_ADMIN_ROLE_ID,
    ADMIN_ROLE_ID,
    HR_ROLE_ID,
    CEO_ROLE_ID,
    MANAGER_ROLE_ID,
  ])
  async getGlobalRoi(
    @Body()
    body: {
      startDate: Date;
      endDate: Date;
      companyId: string;
      teamId?: string;
    },
  ) {
    const startDate = new Date(body.startDate);
    const endDate = new Date(body.endDate);

    return await this.roiService.getGlobalRoi(
      startDate,
      endDate,
      body.companyId,
      body.teamId ?? undefined,
    );
  }

  @Post(":actionId")
  @UseGuards(AuthGuard, RolesGuard)
  @Roles([
    SUPER_ADMIN_ROLE_ID,
    ADMIN_ROLE_ID,
    HR_ROLE_ID,
    CEO_ROLE_ID,
    MANAGER_ROLE_ID,
  ])
  async getActionRoi(
    @Param("actionId") actionId: string,
    @Body()
    body: {
      startDate: Date;
      endDate: Date;
      companyId: string;
      teamId?: string;
    },
  ) {
    const startDate = new Date(body.startDate);
    const endDate = new Date(body.endDate);

    return await this.roiService.getActionRoi(
      actionId,
      startDate,
      endDate,
      body.companyId,
      body.teamId ?? undefined,
    );
  }
}