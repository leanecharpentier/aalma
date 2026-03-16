import { ApiProperty } from "@nestjs/swagger";

export class CreateFormTemplateDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  questions_ids: number[];
}
