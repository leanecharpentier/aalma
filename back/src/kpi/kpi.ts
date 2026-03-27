abstract class Kpi {
  protected questionsIds = [];

  public abstract getCalcul(
    startDate: Date,
    endDate: Date,
    companyId: string,
    teamId?: number,
  );
}
