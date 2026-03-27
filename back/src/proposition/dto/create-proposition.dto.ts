import { ApiProperty } from "@nestjs/swagger";

export class CreatePropositionDto {
  @ApiProperty()
  content: string;
  @ApiProperty()
  question_id: string;
}
