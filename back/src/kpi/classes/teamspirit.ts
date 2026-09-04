import { ActionService } from "src/action/action.service";
import { Kpi } from "./kpi";

export class TeampSpirit extends Kpi {
    constructor(actionService: ActionService) {
      super(actionService);
    }
  protected questionsIds = ["6ac49ea8-4a1b-48dd-a700-29d06fae55e3"];
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
      return await this.getCalcul(startDate, endDate, companyId, teamId)<70;
  }
}
