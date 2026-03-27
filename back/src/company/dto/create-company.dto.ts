import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateCompanyDto {
  @ApiProperty()
  name: string;
  @ApiPropertyOptional()
  color_id?: string;
  @ApiPropertyOptional()
  googleDomain?: string;
  @ApiPropertyOptional()
  microsoftTenantId?: string;
}
