import { ActionService } from "src/action/action.service";
import { Kpi } from "./kpi";
import { KpiFactory } from "./kpifactory";

export class AalmaScore extends Kpi {
  constructor(actionService: ActionService) {
    super(actionService);
  }
  protected questionsIds = [];

  public async getCalcul(
    startDate: Date,
    endDate: Date,
    companyId: string,
    teamId?: string,
  ): Promise<number> {
  const factory = new KpiFactory(this.actionService); 

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
  
  protected async isOverLimit(startDate: Date, endDate: Date, companyId: string, teamId?: string): Promise<boolean> {
      return await this.getCalcul(startDate, endDate, companyId, teamId)<70;
  }
}
