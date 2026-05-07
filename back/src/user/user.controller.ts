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
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { AuthGuard } from "src/auth/auth.guard";
import { RolesGuard } from "src/role/roles.guards";
import { Roles } from "src/role/role.decorator";
import { memoryStorage } from "multer";
import { FileInterceptor } from "@nestjs/platform-express";
import { ImportUsersDto } from "./dto/import-user.dto";
import { ActivityLogService } from "src/activity-log/activity-log.service";
import { ACTIVITY_SUCCESS } from "typeorm/entities/ActivityLog";
import {
  ADMIN_ROLE_ID,
  HR_ROLE_ID,
  SUPER_ADMIN_ROLE_ID,
} from "typeorm/entities/Role";

@Controller("user")
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly activityLogService: ActivityLogService,
  ) {}

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles([SUPER_ADMIN_ROLE_ID, ADMIN_ROLE_ID])
  async create(@Req() req: Request, @Body() createUserDto: CreateUserDto) {
    const connectedUser = (req as any).user;
    const result = await this.userService.create(createUserDto, connectedUser);
    if (!("success" in result && result.success === false)) {
      this.activityLogService.log({
        userId: connectedUser.id,
        action: "user.created",
        status: ACTIVITY_SUCCESS,
      });
    }
    return result;
  }

  @Post("import")
  @UseGuards(AuthGuard, RolesGuard)
  @Roles([SUPER_ADMIN_ROLE_ID, ADMIN_ROLE_ID])
  @UseInterceptors(FileInterceptor("file", { storage: memoryStorage() }))
  import(
    @Req() req: Request,
    @UploadedFile() file: Express.Multer.File,
    @Body() body: ImportUsersDto,
  ) {
    return this.userService.import(req, file, body);
  }

  @Get()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles([SUPER_ADMIN_ROLE_ID, ADMIN_ROLE_ID, HR_ROLE_ID])
  findAll(@Req() req) {
    const session = (req as any).session;
    return this.userService.findAll(session);
  }

  @Get(":id")
  @UseGuards(AuthGuard, RolesGuard)
  @Roles([SUPER_ADMIN_ROLE_ID, ADMIN_ROLE_ID, HR_ROLE_ID])
  findOne(@Param("id") id: string) {
    return this.userService.findOne(id);
  }

  @Patch(":id")
  @UseGuards(AuthGuard, RolesGuard)
  @Roles([SUPER_ADMIN_ROLE_ID, ADMIN_ROLE_ID])
  async update(
    @Req() req: Request,
    @Param("id") id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const connectedUser = (req as any).user;
    const result = await this.userService.update(
      id,
      updateUserDto,
      connectedUser,
    );
    if (!("success" in result && result.success === false)) {
      this.activityLogService.log({
        userId: connectedUser.id,
        action: "user.updated",
        status: ACTIVITY_SUCCESS,
      });
    }
    return result;
  }

  @Delete(":id")
  @UseGuards(AuthGuard, RolesGuard)
  @Roles([SUPER_ADMIN_ROLE_ID, ADMIN_ROLE_ID])
  async remove(@Req() req: Request, @Param("id") id: string) {
    const connectedUser = (req as any).user;
    const result = await this.userService.remove(id, connectedUser);
    if ("affected" in result) {
      this.activityLogService.log({
        userId: connectedUser.id,
        action: "user.deleted",
        status: ACTIVITY_SUCCESS,
        details: `Deleted user : ${result.affected}`,
      });
    }
    return result;
  }
}
