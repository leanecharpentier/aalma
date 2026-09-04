import { IsInt, IsString, IsUUID, Max, Min } from "class-validator";

export class CreateReviewDto {
  @IsUUID()
  available_action_id: string;

  @IsInt()
  @Min(0)
  @Max(5)
  grade: number;

  @IsString()
  comment: string;
}