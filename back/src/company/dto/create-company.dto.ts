import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateCompanyDto {
  @ApiProperty()
  name: string;
  @ApiPropertyOptional()
  color_id?: number;
  @ApiPropertyOptional()
  googleDomain?: string;
  @ApiPropertyOptional()
  microsoftTenantId?: string;
}
