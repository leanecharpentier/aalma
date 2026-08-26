import { PartialType } from "@nestjs/swagger";
import { CreateActionDto } from "./create-action.dto";

export class UpdateActionDto extends PartialType(CreateActionDto) {
  name?: string;
  category_id?: string;
  description?: string;
  schedule?: string;
  ideal_group_low?: number;
  ideal_group_high?: number;
  duration_in_minute?: number;
  in_person?: boolean;
  price?: number;
  note?: number;
  reservation?: number;
}
