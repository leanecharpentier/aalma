import { ActionService } from "src/action/action.service";
import { Kpi } from "./kpi";

export class Recognition extends Kpi {
    constructor(actionService: ActionService
    ) {
      super(actionService);
    }
  protected questionsIds = ["684ff9c3-f5f0-4d67-92e0-a7f4a0a0d66e"];
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

    return (
      (answers.reduce((sum, { content }) => sum + parseInt(content), 0) /
        answers.length /
        5) *
      100
    );
  }

  protected async isOverLimit(startDate: Date, endDate: Date, companyId: string, teamId?: string): Promise<boolean> {
      return await this.getCalcul(startDate, endDate, companyId, teamId)>30;
  }
}
