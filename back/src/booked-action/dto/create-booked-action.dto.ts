import { IsDateString, IsUUID } from "class-validator";

export class CreateBookedActionDto {
  @IsUUID()
  action_id: string;

  @IsUUID()
  priority_id: string;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;
}