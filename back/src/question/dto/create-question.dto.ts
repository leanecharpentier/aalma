import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Proposition } from "typeorm/entities/Proposition";

export class CreateQuestionDto {
  @ApiProperty()
  label: string;
  @ApiProperty()
  type_id: number;
  @ApiPropertyOptional()
  propositions?: Proposition[];
}
