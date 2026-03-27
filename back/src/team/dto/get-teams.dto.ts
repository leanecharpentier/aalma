import { ApiProperty } from "@nestjs/swagger";

export class GetTeamsDto {
  @ApiProperty()
  company_id: number;
}
