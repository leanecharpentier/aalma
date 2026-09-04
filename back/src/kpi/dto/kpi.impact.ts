import { ApiProperty } from "@nestjs/swagger";

class KpiImpactItemDto {
  @ApiProperty({ example: "stress" })
  type: string;

  @ApiProperty({ example: 62 })
  current_score: number;

  @ApiProperty({ example: 74 })
  previous_score: number;

  @ApiProperty({ example: -12 })
  difference: number;

  @ApiProperty({ example: 12 })
  difference_absolute: number;
}

export class KpiImpactResponseDto {
  @ApiProperty({ example: 74.3 })
  aalma_score: number;

  @ApiProperty({ example: 5.2 })
  evolution_score: number;

  @ApiProperty({ type: [KpiImpactItemDto] })
  top_kpis: KpiImpactItemDto[];
}