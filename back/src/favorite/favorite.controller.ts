import { Controller, Get, Post, Body, Delete, Param, UseGuards, Req } from "@nestjs/common";
import { CreateFavoriteDto } from "./dto/create-favorite.dto";
import { FavoriteService } from "./favorite.service";
import { AuthGuard } from "src/auth/auth.guard";

@Controller("favorite")
@UseGuards(AuthGuard)
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Post()
  async create(@Body() dto: CreateFavoriteDto, @Req() req) {
    const connectedUser = (req as any).user;
    return await this.favoriteService.create(dto, connectedUser.id);
  }

  @Get()
  async findAll(@Req() req) {
    const connectedUser = (req as any).user;
    return await this.favoriteService.findAllForUser(connectedUser.id);
  }

  @Delete(":availableActionId")
  async remove(@Param("availableActionId") availableActionId: string, @Req() req) {
    const connectedUser = (req as any).user;
    return await this.favoriteService.remove(availableActionId, connectedUser.id);
  }
}