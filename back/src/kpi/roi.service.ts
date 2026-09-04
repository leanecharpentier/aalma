// kpi/roi.service.ts
import { Injectable } from "@nestjs/common";
import { AppDataSource } from "DataSource";
import { BookedAction } from "typeorm/entities/BookedAction";
import { User } from "typeorm/entities/User";
import { AalmaScore } from "./classes/aalmascore";
import { ActionService } from "src/action/action.service";
import { parsePrice } from "./utils/parse-price";

export const VALUE_PER_AALMA_POINT = 15;

@Injectable()
export class RoiService {
  constructor(private readonly actionService: ActionService) {}

  private async sumCost(
    startDate: Date,
    endDate: Date,
    companyId: string,
    teamId?: string,
    actionId?: string,
  ): Promise<number> {
    const qb = AppDataSource.getRepository(BookedAction)
      .createQueryBuilder("booked_action")
      .innerJoin("booked_action.action", "action")
      .where("action.company_id = :companyId", { companyId })
      .andWhere("booked_action.startDate BETWEEN :startDate AND :endDate", {
        startDate,
        endDate,
      });

    if (teamId) {
      qb.innerJoin("booked_action.priority", "priority")
        .innerJoin("priority.roadmap", "roadmap")
        .andWhere("roadmap.team_id = :teamId", { teamId });
    }

    if (actionId) {
      qb.andWhere("booked_action.action_id = :actionId", { actionId });
    }

    qb.select(["action.price"]);

    const bookedActions = await qb.getMany();

    return bookedActions.reduce(
      (total, booked) => total + parsePrice(booked.action?.price),
      0,
    );
  }

  private async countEmployees(
    companyId: string,
    teamId?: string,
  ): Promise<number> {
    const qb = AppDataSource.getRepository(User)
      .createQueryBuilder("user")
      .innerJoin("user.team", "team")
      .where("team.company_id = :companyId", { companyId });

    if (teamId) {
      qb.andWhere("user.team_id = :teamId", { teamId });
    }

    return await qb.getCount();
  }

  async getGlobalRoi(
    startDate: Date,
    endDate: Date,
    companyId: string,
    teamId?: string,
  ) {
    const currentCost = await this.sumCost(startDate, endDate, companyId, teamId);

    const periodDuration =
      (endDate.getFullYear() - startDate.getFullYear()) * 12 -
      startDate.getMonth() +
      endDate.getMonth();
    const periodDurationInYear = Math.floor(periodDuration / 12);
    const periodDurationInMonth = (periodDuration % 12) + 1;

    const prevEnd = new Date(startDate);
    prevEnd.setDate(prevEnd.getDate() - 1);

    const prevStart = new Date(startDate);
    prevStart.setMonth(prevStart.getMonth() - periodDurationInMonth);
    prevStart.setFullYear(prevStart.getFullYear() - periodDurationInYear);

    const previousCost = await this.sumCost(prevStart, prevEnd, companyId, teamId);

    const aalma = new AalmaScore(this.actionService);
    const scoreEvolution = await aalma.getEvolution(
      new Date(startDate),
      new Date(endDate),
      companyId,
      teamId,
    );

    const employeeCount = await this.countEmployees(companyId, teamId);

    const estimatedGain = scoreEvolution * VALUE_PER_AALMA_POINT * employeeCount;

    const roi = currentCost > 0 ? (estimatedGain - currentCost) / currentCost : null;

    return {
      cost: currentCost,
      cost_previous_period: previousCost,
      cost_evolution: currentCost - previousCost,
      employee_count: employeeCount,
      aalma_score_evolution: scoreEvolution,
      estimated_gain: estimatedGain,
      roi,
    };
  }


  async getActionRoi(
    actionId: string,
    startDate: Date,
    endDate: Date,
    companyId: string,
    teamId?: string,
  ) {
    const cost = await this.sumCost(startDate, endDate, companyId, teamId, actionId);

    return {
      action_id: actionId,
      cost,
      estimated_gain: null,
      roi: null,
      note: "Le gain estimé n'est calculable qu'à l'échelle globale (company/team), car il repose sur l'évolution du score Aalma agrégé.",
    };
  }
}