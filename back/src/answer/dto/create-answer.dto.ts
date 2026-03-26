import { ApiProperty } from "@nestjs/swagger";

export class CreateAnswerDto {
  @ApiProperty()
  content: string;

  @ApiProperty()
  form_id: number;

  @ApiProperty()
  question_id: number;
}
