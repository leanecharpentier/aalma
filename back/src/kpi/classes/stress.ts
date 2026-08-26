import { ActionService } from "src/action/action.service";
import { Kpi } from "./kpi";

export class Stress extends Kpi {
    constructor(actionService: ActionService) {
      super(actionService);
    }
  protected questionsIds = ["959fe825-50bb-48fc-8c08-495114bb54d7"];
  protected actionsIds: string[] = ["f198d234-b3a4-47bc-bafd-c24db62783f5", "4b033e42-f5e8-4f4c-b601-a2607b9f7fa2"];

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
