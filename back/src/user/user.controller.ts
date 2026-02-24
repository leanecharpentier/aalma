import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { AuthGuard } from "src/auth/auth.guard";
import { RolesGuard } from "src/role/roles.guards";
import { Roles } from "src/role/role.decorator";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(["Super Admin", "Admin"])
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(["Super Admin", "Admin", "HR"])
  findAll() {
    return this.userService.findAll();
  }

  @Get(":id")
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(["Super Admin", "Admin", "HR"])
  findOne(@Param("id") id: string) {
    return this.userService.findOne(id);
  }

  @Patch(":id")
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(["Super Admin", "Admin"])
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(":id")
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(["Super Admin", "Admin"])
  remove(@Param("id") id: string) {
    return this.userService.remove(id);
  }
}
