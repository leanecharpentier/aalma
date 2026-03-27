import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateFormDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  startDate: Date;

  @ApiProperty()
  endDate: Date;

  @ApiProperty()
  template_id: string;

  @ApiPropertyOptional()
  company_id?: string;
}
