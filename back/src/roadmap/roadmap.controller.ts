import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from "@nestjs/common";
import { CreateRoadmapDto } from "./dto/create-roadmap.dto";
import { UpdateRoadmapDto } from "./dto/update-roadmap.dto";
import { RoadmapService } from "./roadmap.service";
import { AuthGuard } from "src/auth/auth.guard";
import { RolesGuard } from "src/role/roles.guards";
import { Roles } from "src/role/role.decorator";
import { SUPER_ADMIN_ROLE_ID, ADMIN_ROLE_ID, MANAGER_ROLE_ID } from "typeorm/entities/Role";

@Controller("roadmap")
@UseGuards(AuthGuard, RolesGuard)
export class RoadmapController {
  constructor(private readonly roadmapService: RoadmapService) {}

  @Post()
  @Roles([SUPER_ADMIN_ROLE_ID, ADMIN_ROLE_ID, MANAGER_ROLE_ID])
  async create(@Body() dto: CreateRoadmapDto) {
    return await this.roadmapService.create(dto);
  }

  @Get()
  @Roles([SUPER_ADMIN_ROLE_ID, ADMIN_ROLE_ID, MANAGER_ROLE_ID])
  async findAllForTeam(@Query("team_id") teamId: string) {
    return await this.roadmapService.findAllForTeam(teamId);
  }

  @Get(":id")
  @Roles([SUPER_ADMIN_ROLE_ID, ADMIN_ROLE_ID, MANAGER_ROLE_ID])
  async findOne(@Param("id") id: string) {
    return await this.roadmapService.findOne(id);
  }

  @Patch(":id")
  @Roles([SUPER_ADMIN_ROLE_ID, ADMIN_ROLE_ID, MANAGER_ROLE_ID])
  async update(@Param("id") id: string, @Body() dto: UpdateRoadmapDto) {
    return await this.roadmapService.update(id, dto);
  }

  @Delete(":id")
  @Roles([SUPER_ADMIN_ROLE_ID, ADMIN_ROLE_ID])
  async remove(@Param("id") id: string) {
    return await this.roadmapService.remove(id);
  }
}