import { ActionService } from "src/action/action.service";
import { Kpi } from "./kpi";

export class WorkLoad extends Kpi {
    constructor(actionService: ActionService
    ) {
      super(actionService);
    }
  protected questionsIds = ["0c2b4b39-c9f8-4ce9-8b56-642d1a1de16a"];
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
