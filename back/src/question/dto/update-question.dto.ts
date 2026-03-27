import { PartialType } from "@nestjs/mapped-types";
import { CreateQuestionDto } from "./create-question.dto";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { Proposition } from "typeorm/entities/Proposition";

export class UpdateQuestionDto extends PartialType(CreateQuestionDto) {
  @ApiPropertyOptional()
  label?: string;
  @ApiPropertyOptional()
  type_id?: string;
  @ApiPropertyOptional()
  propositions?: Proposition[];
}
