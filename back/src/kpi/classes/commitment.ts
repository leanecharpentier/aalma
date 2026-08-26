import { ActionService } from "src/action/action.service";
import { Kpi } from "./kpi";

export class Commitment extends Kpi {
    constructor(actionService: ActionService) {
      super(actionService);
    }
  protected questionsIds = ["246b5d68-b25c-4741-b9ef-ad54b17d97ee"];
  protected actionsIds = []

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
    return (
      (answers.reduce((sum, { content }) => sum + parseInt(content), 0) /
        answers.length /
        5) *
      100
    );
  }

  protected async isOverLimit(startDate: Date, endDate: Date, companyId: string, teamId?: string): Promise<boolean> {
      return await this.getCalcul(startDate, endDate, companyId, teamId)<70;
  }
}
