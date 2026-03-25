import { PartialType } from "@nestjs/mapped-types";
import { CreatePropositionDto } from "./create-proposition.dto";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class UpdatePropositionDto extends PartialType(CreatePropositionDto) {
  @ApiPropertyOptional()
  content?: string;
  @ApiPropertyOptional()
  question_id?: number;
}
