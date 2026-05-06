import { ApiProperty } from "@nestjs/swagger";
import { Team } from "better-auth/client";

export class KpiScoreResponseDto {
  @ApiProperty({ example: 78.5, description: "Score Aalma global" })
  aalma_score: number;

  @ApiProperty({
    example: { turnover_rate: 12.3, absenteeism: 4.1 },
    description: "Valeurs de chaque KPI",
  })
  kpis: Record<string, number>;

  @ApiProperty({
    example: 3.2,
    description: "Évolution du score par rapport à la période précédente",
  })
  evolution_score: number;

  @ApiProperty({
    required: false,
    description:
      "Équipes avec les scores les plus bas (absent si teamId fourni)",
    example: [{ team: { id: "team-uuid", name: "Équipe A" }, score: 45.2 }],
  })
  worst_team?: { team: Team; score: number }[];
}
