import { Kpi } from "./kpi";

export class Commitment extends Kpi {
  protected questionsIds = ["246b5d68-b25c-4741-b9ef-ad54b17d97ee"];

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
