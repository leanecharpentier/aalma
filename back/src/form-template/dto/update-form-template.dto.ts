import { PartialType } from "@nestjs/mapped-types";
import { CreateFormTemplateDto } from "./create-form-template.dto";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class UpdateFormTemplateDto extends PartialType(CreateFormTemplateDto) {
  id: number;
  @ApiPropertyOptional()
  name?: string;
  @ApiPropertyOptional()
  questions_ids?: number[];
}
