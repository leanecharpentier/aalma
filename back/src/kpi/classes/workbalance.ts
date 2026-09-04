import { ActionService } from "src/action/action.service";
import { Kpi } from "./kpi";

export class WorkBalance extends Kpi {
    constructor(actionService: ActionService) {
      super(actionService);
    }
  protected questionsIds = ["a719cf50-9908-4edb-a137-8ade2a9c5ad5"];
  protected actionsIds: string[] = [];

  public async getCalcul(
    startDate: Date,
    endDate: Date,
    companyId: string,
    teamId?: string,
  ): Promise<number> {
    const answers = await this.getAnswers(
      startDate,
      endDate,
      companyId,
      teamId,
    );

    if (!answers.length) return 0;
    let yes = 0;
    answers.forEach((answer) => {
      if (answer.content === "Oui") {
        yes++;
      }
    });

    return (yes / answers.length) * 100;
  }
  protected async isOverLimit(startDate: Date, endDate: Date, companyId: string, teamId?: string): Promise<boolean> {
      return await this.getCalcul(startDate, endDate, companyId, teamId)>30;
  }
}
