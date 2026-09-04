import { IsUUID } from "class-validator";

export class CreateFavoriteDto {
  @IsUUID()
  available_action_id: string;
}