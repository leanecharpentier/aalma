import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from "@nestjs/common";
import { CreateReviewDto } from "./dto/create-review.dto";
import { UpdateReviewDto } from "./dto/update-review.dto";
import { ReviewService } from "./review.service";
import { AuthGuard } from "src/auth/auth.guard";

@Controller("review")
@UseGuards(AuthGuard)
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  async create(@Body() dto: CreateReviewDto, @Req() req) {
    return await this.reviewService.create(dto, (req as any).user.id);
  }

  @Get("action/:availableActionId")
  async findAllForAction(@Param("availableActionId") availableActionId: string) {
    return await this.reviewService.findAllForAction(availableActionId);
  }

  @Patch(":id")
  async update(@Param("id") id: string, @Body() dto: UpdateReviewDto, @Req() req) {
    return await this.reviewService.update(id, dto, (req as any).user.id);
  }

  @Delete(":id")
  async remove(@Param("id") id: string, @Req() req) {
    return await this.reviewService.remove(id, (req as any).user.id);
  }
}