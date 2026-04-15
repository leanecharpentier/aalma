import { AppDataSource } from "DataSource";
import { Answer } from "typeorm/entities/Answer";

export abstract class Kpi {
  protected questionsIds: string[];

  protected async getAnswers(
    startDate: Date,
    endDate: Date,
    companyId: string,
    teamId?: string,
  ): Promise<Answer[]> {
    const qb = AppDataSource.getRepository(Answer)
      .createQueryBuilder("answers")
      .innerJoin("answers.form", "form")
      .innerJoin("answers.user", "user")
      .where("form.startDate BETWEEN :startDate AND :endDate", {
        startDate,
        endDate,
      })
      .andWhere("form.company_id = :company_id", { company_id: companyId })
      .andWhere("answers.question_id IN (:...questionIds)", {
        questionIds: this.questionsIds,
      });

    if (teamId) {
      qb.andWhere("user.team_id = :teamId", { teamId });
    }

    return await qb.getMany();
  }

  public abstract getCalcul(
    startDate: Date,
    endDate: Date,
    companyId: string,
    teamId?: string,
  ): Promise<number>;
}
