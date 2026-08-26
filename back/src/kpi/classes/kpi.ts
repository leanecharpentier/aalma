import { AppDataSource } from "DataSource";
import { Action } from "typeorm/entities/Action";
import { Answer } from "typeorm/entities/Answer";
import { ActionService } from "src/action/action.service";

export abstract class Kpi {
  protected questionsIds: string[];
  protected actionsIds: string[];
constructor(protected actionService: ActionService) {}
  protected async getAnswers(
    startDate: Date,
    endDate: Date,
    companyId: string,
    teamId?: string,
  ): Promise<Answer[]> {
    const qb = AppDataSource.getRepository(Answer)
      .createQueryBuilder("answers")
      .innerJoin("answers.form", "form")
      .innerJoin("answers.user", "user")
      .where("form.startDate BETWEEN :startDate AND :endDate", {
        startDate,
        endDate,
      })
      .andWhere("form.company_id = :company_id", { company_id: companyId })
      .andWhere("answers.question_id IN (:...questionIds)", {
        questionIds: this.questionsIds,
      });

    if (teamId) {
      qb.andWhere("user.team_id = :teamId", { teamId });
    }

    return await qb.getMany();
  }

  public abstract getCalcul(
    startDate: Date,
    endDate: Date,
    companyId: string,
    teamId?: string,
  ): Promise<number>;

  protected abstract isOverLimit(
    startDate: Date,
    endDate: Date,
    companyId: string,
    teamId?: string,
  ): Promise<boolean>;

  public async getRecommandedActions(
    startDate: Date,
    endDate: Date,
    companyId: string,
    teamId?: string
  ):Promise<Action[]> {
    if (await this.isOverLimit(startDate, endDate, companyId, teamId)) {
      const actions = await Promise.all(
        this.actionsIds.map((id) => this.actionService.findOne(id))
      );
      return actions.filter((a): a is Action => a !== null);
    }
    return [];
  }

  
  public async getEvolution(
    startDate: Date,
    endDate: Date,
    companyId: string,
    teamId?: string,
    previousStartDate?: Date,
    previousEndDate?: Date,
  ): Promise<number> {
    const current_score = await this.getCalcul(
      startDate,
      endDate,
      companyId,
      teamId,
    );
    const periodDuration =
      (endDate.getFullYear() - startDate.getFullYear()) * 12 -
      startDate.getMonth() +
      endDate.getMonth();
    const periodDurationInYear = Math.floor(periodDuration / 12);
    const periodDurationInMonth: number = (periodDuration % 12) + 1;

    const prevEnd =
      previousEndDate ??
      (() => {
        endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() - 1);
        return endDate;
      })();

    const prevStart =
      previousStartDate ??
      (() => {
        startDate.setMonth(startDate.getMonth() - periodDurationInMonth);
        startDate.setFullYear(startDate.getFullYear() - periodDurationInYear);
        return startDate;
      })();

    const previous_score = await this.getCalcul(
      prevStart,
      prevEnd,
      companyId,
      teamId,
    );

    if (previous_score === 0) {
      return 0;
    }

    return current_score - previous_score;
  }
}
