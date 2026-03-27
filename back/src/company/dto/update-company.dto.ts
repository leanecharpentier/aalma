import { PartialType } from "@nestjs/mapped-types";
import { CreateCompanyDto } from "./create-company.dto";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class UpdateCompanyDto extends PartialType(CreateCompanyDto) {
  @ApiProperty()
  name: string;
  @ApiPropertyOptional()
  color_id?: string;
  @ApiPropertyOptional()
  googleDomain?: string;
  @ApiPropertyOptional()
  microsoftTenantId?: string;
}
