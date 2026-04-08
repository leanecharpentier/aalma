import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from "@nestjs/common";
import { FormTemplateService } from "./form-template.service";
import { CreateFormTemplateDto } from "./dto/create-form-template.dto";
import { UpdateFormTemplateDto } from "./dto/update-form-template.dto";
import { ACTIVITY_SUCCESS } from "typeorm/entities/ActivityLog";
import { ActivityLogService } from "src/activity-log/activity-log.service";
import { AuthGuard } from "src/auth/auth.guard";
import { RolesGuard } from "src/role/roles.guards";
import { Roles } from "src/role/role.decorator";
import {
  ADMIN_ROLE_ID,
  HR_ROLE_ID,
  SUPER_ADMIN_ROLE_ID,
} from "typeorm/entities/Role";

@Controller("form-template")
export class FormTemplateController {
  constructor(
    private readonly formTemplateService: FormTemplateService,
    private readonly activityLogService: ActivityLogService,
  ) {}

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles([SUPER_ADMIN_ROLE_ID])
  async create(
    @Req() req,
    @Body() createFormTemplateDto: CreateFormTemplateDto,
  ) {
    const connectedUser = (req as any).user;
    const result = await this.formTemplateService.create(
      createFormTemplateDto,
      connectedUser,
    );
    if (!("success" in result && result.success === false)) {
      this.activityLogService.log({
        userId: connectedUser.id,
        action: "form.template.created",
        status: ACTIVITY_SUCCESS,
      });
    }
    return result;
  }

  @Get()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles([SUPER_ADMIN_ROLE_ID, ADMIN_ROLE_ID, HR_ROLE_ID])
  async findAll() {
    return await this.formTemplateService.findAll();
  }

  @Get(":id")
  @UseGuards(AuthGuard, RolesGuard)
  @Roles([SUPER_ADMIN_ROLE_ID, ADMIN_ROLE_ID, HR_ROLE_ID])
  async findOne(@Param("id") id: string) {
    return await this.formTemplateService.findOne(id);
  }

  @Patch(":id")
  @UseGuards(AuthGuard, RolesGuard)
  @Roles([SUPER_ADMIN_ROLE_ID])
  async update(
    @Req() req,
    @Param("id") id: string,
    @Body() updateFormTemplateDto: UpdateFormTemplateDto,
  ) {
    const connectedUser = (req as any).user;
    const result = await this.formTemplateService.update(
      id,
      updateFormTemplateDto,
      connectedUser,
    );
    if (result && !("success" in result && result.success === false)) {
      this.activityLogService.log({
        userId: connectedUser.id,
        action: "form.template.updated",
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
    const result = await this.formTemplateService.remove(id, connectedUser);
    if (!("success" in result && result.success === false)) {
      this.activityLogService.log({
        userId: connectedUser.id,
        action: "form.template.deleted",
        status: ACTIVITY_SUCCESS,
      });
    }
    return result;
  }
}
