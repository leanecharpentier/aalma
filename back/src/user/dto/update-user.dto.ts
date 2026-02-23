import { OmitType, PartialType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./create-user.dto";

export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ["email", "id"] as const),
) {
  name?: string;
  firstname?: string;
  lastname?: string;
  role_id?: string;
  team_id?: string;
}
