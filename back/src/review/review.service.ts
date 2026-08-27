import { Injectable } from "@nestjs/common";
import { AppDataSource } from "DataSource";
import { Review } from "typeorm/entities/Review";
import { CreateReviewDto } from "./dto/create-review.dto";
import { UpdateReviewDto } from "./dto/update-review.dto";

@Injectable()
export class ReviewService {
  async create(dto: CreateReviewDto, userId: string) {
    try {
      return await AppDataSource.getRepository(Review)
        .createQueryBuilder()
        .insert()
        .values({ ...dto, user_id: userId })
        .execute();
    } catch (e) {
      return { success: false, message: e.detail };
    }
  }

  async findAllForAction(availableActionId: string) {
    return await AppDataSource.getRepository(Review)
      .createQueryBuilder("review")
      .leftJoinAndSelect("review.user", "user")
      .where("review.available_action_id = :availableActionId", { availableActionId })
      .getMany();
  }

  async update(id: string, dto: UpdateReviewDto, userId: string) {
    return await AppDataSource.getRepository(Review)
      .createQueryBuilder()
      .update()
      .set(dto)
      .where("id = :id AND user_id = :userId", { id, userId }) // seul l'auteur peut modifier
      .execute();
  }

  async remove(id: string, userId: string) {
    return await AppDataSource.getRepository(Review)
      .createQueryBuilder()
      .delete()
      .where("id = :id AND user_id = :userId", { id, userId })
      .execute();
  }
}