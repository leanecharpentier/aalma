import { Injectable } from "@nestjs/common";
import { AppDataSource } from "DataSource";
import { Favorite } from "typeorm/entities/Favorite";
import { CreateFavoriteDto } from "./dto/create-favorite.dto";

@Injectable()
export class FavoriteService {
  async create(dto: CreateFavoriteDto, userId: string) {
    try {
      return await AppDataSource.getRepository(Favorite)
        .createQueryBuilder()
        .insert()
        .values({ user_id: userId, available_action_id: dto.available_action_id })
        .execute();
    } catch (e) {
      return { success: false, message: e.detail };
    }
  }

  async findAllForUser(userId: string) {
    return await AppDataSource.getRepository(Favorite)
      .createQueryBuilder("favorite")
      .leftJoinAndSelect("favorite.action", "action")
      .where("favorite.user_id = :userId", { userId })
      .getMany();
  }

  async remove(availableActionId: string, userId: string) {
    return await AppDataSource.getRepository(Favorite)
      .createQueryBuilder()
      .delete()
      .where("user_id = :userId AND available_action_id = :availableActionId", {
        userId,
        availableActionId,
      })
      .execute();
  }
}