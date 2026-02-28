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
import { CompanyService } from "./company.service";
import { CreateCompanyDto } from "./dto/create-company.dto";
import { UpdateCompanyDto } from "./dto/update-company.dto";
import { AuthGuard } from "src/auth/auth.guard";
import { Roles } from "src/role/role.decorator";
import { RolesGuard } from "src/role/roles.guards";
import { ActivityLogService } from "src/activity-log/activity-log.service";
import { ACTIVITY_SUCCESS } from "typeorm/entities/ActivityLog";

@Controller("company")
export class CompanyController {
  constructor(
    private readonly companyService: CompanyService,
    private readonly activityLogService: ActivityLogService,
  ) {}

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(["Super Admin"])
  async create(@Req() req, @Body() createCompanyDto: CreateCompanyDto) {
    const connectedUser = (req as any).user;
    const result = await this.companyService.create(
      createCompanyDto,
      connectedUser,
    );
    if (!("success" in result && result.success === false)) {
      this.activityLogService.log({
        userId: connectedUser.id,
        action: "company.created",
        status: ACTIVITY_SUCCESS,
      });
    }
    return result;
  }

  @Get()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(["Super Admin"])
  findAll() {
    return this.companyService.findAll();
  }

  @Get(":id")
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(["Super Admin"])
  findOne(@Param("id") id: string) {
    return this.companyService.findOne(+id);
  }

  @Patch(":id")
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(["Super Admin"])
  async update(
    @Req() req,
    @Param("id") id: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ) {
    const connectedUser = (req as any).user;
    const result = await this.companyService.update(
      +id,
      updateCompanyDto,
      connectedUser,
    );
    if (!("success" in result && result.success === false)) {
      this.activityLogService.log({
        userId: connectedUser.id,
        action: "company.updated",
        status: ACTIVITY_SUCCESS,
      });
    }
    return result;
  }

  @Delete(":id")
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(["Super Admin"])
  async remove(@Req() req, @Param("id") id: string) {
    const connectedUser = (req as any).user;
    const result = await this.companyService.remove(+id, connectedUser);
    if (!("success" in result && result.success === false)) {
      this.activityLogService.log({
        userId: connectedUser.id,
        action: "company.deleted",
        status: ACTIVITY_SUCCESS,
      });
    }
    return result;
  }
}
