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
    const stressResult =
      100 -
      ((await stressKpi?.getCalcul(startDate, endDate, companyId, teamId)) ??
        0);

    // Calcul Work Load
    const loadKpi = factory.create("workload");
    const loadResult =
      100 -
      ((await loadKpi?.getCalcul(startDate, endDate, companyId, teamId)) ?? 0);

    // Calcul recognition
    const recognitionKpi = factory.create("recognition");
    const recognitionResult =
      (await recognitionKpi?.getCalcul(
        startDate,
        endDate,
        companyId,
        teamId,
      )) ?? 0;

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
    const balanceResult =
      100 -
      ((await balanceKpi?.getCalcul(startDate, endDate, companyId, teamId)) ??
        0);

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
}
