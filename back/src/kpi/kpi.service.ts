import { Injectable } from "@nestjs/common";
import { KpiFactory } from "./classes/kpifactory";
import { TeamService } from "src/team/team.service";
import { AalmaScore } from "./classes/aalmascore";
import { Team } from "typeorm/entities/Team";

@Injectable()
export class KpiService {
  constructor(private teamService: TeamService) {}
  types = [
    "workload",
    "stress",
    "recognition",
    "teamspirit",
    "workbalance",
    "commitment",
  ];
  async allKPI(
    factory: KpiFactory,
    startDate: Date,
    endDate: Date,
    companyId: string,
    teamId?: string,
  ): Promise<Record<string, number>> {
    const scores: Record<string, number> = {};
    await Promise.all(
      this.types.map(async (type) => {
        const kpi = factory.create(type);
        if (kpi) {
          scores[type] = await kpi.getCalcul(
            startDate,
            endDate,
            companyId,
            teamId ?? undefined,
          );
        }
      }),
    );
    return scores;
  }

  async worstTeam(
    startDate: Date,
    endDate: Date,
    companyId: string,
  ): Promise<{ team: Team; score: number }[]> {
    const teams = await this.teamService.findAll({ company_id: companyId });
    const score = new AalmaScore();
    const worst_team: { team: Team; score: number }[] = [];
    await Promise.all(
      teams.map(async (team) => {
        worst_team.push({
          team: team,
          score: await score.getCalcul(startDate, endDate, companyId, team.id),
        });
      }),
    );
    worst_team.sort((a, b) => a.score - b.score);
    return worst_team.splice(0, 3);
  }

  async biggestEvolution(
    factory: KpiFactory,
    startDate: Date,
    endDate: Date,
    companyId: string,
    teamId?: string,
    previousStartDate?: Date,
    previousEndDate?: Date,
  ): Promise<
    {
      type: string;
      current_score: number;
      previous_score: number;
      difference_absolute: number;
      difference: number;
    }[]
  > {
    const periodDuration =
      (endDate.getFullYear() - startDate.getFullYear()) * 12 -
      startDate.getMonth() +
      endDate.getMonth();
    const periodDurationInYear = Math.floor(periodDuration / 12);
    const periodDurationInMonth: number = (periodDuration % 12) + 1;

    const prevEnd =
      previousEndDate ??
      (() => {
        const d = new Date(startDate);
        d.setDate(d.getDate() - 1);
        return d;
      })();

    const prevStart =
      previousStartDate ??
      (() => {
        const d = new Date(startDate);
        d.setMonth(d.getMonth() - periodDurationInMonth);
        d.setFullYear(d.getFullYear() - periodDurationInYear);
        return d;
      })();

    const scores: {
      type: string;
      current_score: number;
      previous_score: number;
      difference_absolute: number;
      difference: number;
    }[] = [];

    await Promise.all(
      this.types.map(async (type) => {
        const kpi = factory.create(type);
        if (kpi) {
          const current_score = await kpi.getCalcul(
            startDate,
            endDate,
            companyId,
            teamId ?? undefined,
          );
          const previous_score = await kpi.getCalcul(
            prevStart,
            prevEnd,
            companyId,
            teamId ?? undefined,
          );
          const difference = current_score - previous_score;

          scores.push({
            type,
            current_score,
            previous_score,
            difference,
            difference_absolute: Math.abs(difference),
          });
        }
      }),
    );

    scores.sort((a, b) => b.difference_absolute - a.difference_absolute);
    return scores.splice(0, 3);
  }
}
