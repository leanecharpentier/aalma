import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiBody,
  ApiResponse,
  ApiProperty,
} from "@nestjs/swagger";

export class KpiDetailBodyDto {
  @ApiProperty({
    example: "2024-01-01",
    description: "Date de début de la période",
  })
  startDate: Date;

  @ApiProperty({
    example: "2024-12-31",
    description: "Date de fin de la période",
  })
  endDate: Date;

  @ApiProperty({
    example: "company-uuid-123",
    description: "Identifiant de la company",
  })
  companyId: string;

  @ApiProperty({
    example: "team-uuid-456",
    description: "Identifiant de l'équipe (optionnel)",
    required: false,
  })
  teamId?: string;
}
