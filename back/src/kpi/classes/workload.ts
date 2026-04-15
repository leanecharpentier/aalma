import { Kpi } from "./kpi";

export class WorkLoad extends Kpi {
  protected questionsIds = ["0c2b4b39-c9f8-4ce9-8b56-642d1a1de16a"];

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
}
