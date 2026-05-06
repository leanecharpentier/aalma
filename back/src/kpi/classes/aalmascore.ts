import { Kpi } from "./kpi";
import { KpiFactory } from "./kpifactory";

export class AalmaScore extends Kpi {
  protected questionsIds = [];

  public async getCalcul(
    startDate: Date,
    endDate: Date,
    companyId: string,
    teamId?: string,
  ): Promise<number> {
    const factory = new KpiFactory();

    // Calcul stress
    const stressKpi = factory.create("stress");
    let calcul = await stressKpi?.getCalcul(
      startDate,
      endDate,
      companyId,
      teamId,
    );
    const stressResult = calcul ? 100 - calcul : 0;

    // Calcul Work Load
    const loadKpi = factory.create("workload");
    calcul = await loadKpi?.getCalcul(startDate, endDate, companyId, teamId);
    const loadResult = calcul ? 100 - calcul : 0;

    // Calcul recognition
    const recognitionKpi = factory.create("recognition");
    calcul = await recognitionKpi?.getCalcul(
      startDate,
      endDate,
      companyId,
      teamId,
    );
    const recognitionResult = calcul ? 100 - calcul : 0;

    // Calcul team spirit
    const teamSpiritKpi = factory.create("teamspirit");
    const teamSpiritResult =
      (await teamSpiritKpi?.getCalcul(startDate, endDate, companyId, teamId)) ??
      0;

    // Calcul commitment
    const commitmentKpi = factory.create("commitment");
    const commitmentResult =
      (await commitmentKpi?.getCalcul(startDate, endDate, companyId, teamId)) ??
      0;

    // Calcul Work/Life Balance
    const balanceKpi = factory.create("workbalance");
    calcul = await balanceKpi?.getCalcul(startDate, endDate, companyId, teamId);
    const balanceResult = calcul ? 100 - calcul : 0;
    return (
      (stressResult +
        loadResult +
        recognitionResult +
        teamSpiritResult +
        commitmentResult +
        balanceResult) /
      6
    );
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
