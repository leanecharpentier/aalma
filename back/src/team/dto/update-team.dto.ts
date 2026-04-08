import { PartialType } from "@nestjs/mapped-types";
import { CreateTeamDto } from "./create-team.dto";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class UpdateTeamDto extends PartialType(CreateTeamDto) {
  @ApiPropertyOptional()
  name?: string | undefined;
  @ApiPropertyOptional()
  company_id?: string | undefined;
}
