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

@Controller("action")
export class ActionController {
  constructor(private readonly actionService: ActionService) {}

  @Post()
  create(@Body() createActionDto: CreateActionDto) {
    return this.actionService.create(createActionDto);
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
  async findAll(@Query() filters: object) {
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
  update(@Param("id") id: string, @Body() updateActionDto: UpdateActionDto) {
    return this.actionService.update(+id, updateActionDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.actionService.remove(+id);
  }
}
