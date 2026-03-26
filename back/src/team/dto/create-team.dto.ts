import { ApiProperty } from "@nestjs/swagger";

export class CreateTeamDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  company_id: number;
}
