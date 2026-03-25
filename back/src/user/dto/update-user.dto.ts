import { OmitType, PartialType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./create-user.dto";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ["email", "id"] as const),
) {
  @ApiPropertyOptional()
  name?: string;
  @ApiPropertyOptional()
  firstname?: string;
  @ApiPropertyOptional()
  lastname?: string;
  @ApiPropertyOptional()
  role_id?: number;
  @ApiPropertyOptional()
  team_id?: number;
}
