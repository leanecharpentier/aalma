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
import { QuestionService } from "./question.service";
import { CreateQuestionDto } from "./dto/create-question.dto";
import { UpdateQuestionDto } from "./dto/update-question.dto";
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

@Controller("question")
export class QuestionController {
  constructor(
    private readonly questionService: QuestionService,
    private readonly activityLogService: ActivityLogService,
  ) {}

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles([SUPER_ADMIN_ROLE_ID])
  async create(@Req() req, @Body() createQuestionDto: CreateQuestionDto) {
    const connectedUser = (req as any).user;
    const result = await this.questionService.create(
      createQuestionDto,
      connectedUser,
    );
    if (!("success" in result && result.success === false)) {
      this.activityLogService.log({
        userId: connectedUser.id,
        action: "question.created",
        status: ACTIVITY_SUCCESS,
      });
    }
    return result;
  }

  @Get()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles([SUPER_ADMIN_ROLE_ID, ADMIN_ROLE_ID, HR_ROLE_ID])
  findAll() {
    return this.questionService.findAll();
  }

  @Get(":id")
  @UseGuards(AuthGuard, RolesGuard)
  @Roles([SUPER_ADMIN_ROLE_ID, ADMIN_ROLE_ID, HR_ROLE_ID])
  findOne(@Param("id") id: string) {
    return this.questionService.findOne(id);
  }

  @Patch(":id")
  @UseGuards(AuthGuard, RolesGuard)
  @Roles([SUPER_ADMIN_ROLE_ID])
  async update(
    @Req() req,
    @Param("id") id: string,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ) {
    const connectedUser = (req as any).user;
    const result = await this.questionService.update(
      id,
      updateQuestionDto,
      connectedUser,
    );
    if (!("success" in result && result.success === false)) {
      this.activityLogService.log({
        userId: connectedUser.id,
        action: "question.updated",
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
    const result = await this.questionService.remove(id, connectedUser);
    if (!("success" in result && result.success === false)) {
      this.activityLogService.log({
        userId: connectedUser.id,
        action: "question.deleted",
        status: ACTIVITY_SUCCESS,
      });
    }
    return result;
  }
}
