import { IsUUID } from "class-validator";

export class CreateRoadmapDto {
  @IsUUID()
  team_id: string;
}