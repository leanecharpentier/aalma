import { ApiProperty } from "@nestjs/swagger";

export class CreateAnswerDto {
  @ApiProperty()
  content: string;

  @ApiProperty()
  form_id: string;

  @ApiProperty()
  question_id: string;
}
