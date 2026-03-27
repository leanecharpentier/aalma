import { Body, Controller, Param, Post } from "@nestjs/common";
import { KpiFactory } from "./classes/kpifactory";

@Controller("kpi")
export class KpiController {
  @Post(":kpiType")
  async findOne(
    @Param("kpiType") kpiType: string,
    @Body() body: {
      startDate: Date;
      endDate: Date;
      companyId: string;
      teamId?: string;
    },
  ) {
    const factory = new KpiFactory();
    const kpi = factory.create(kpiType);
    if (kpi) {
      return `${await kpi.getCalcul(
        body.startDate,
        body.endDate,
        body.companyId,
        body.teamId ?? undefined,
      )}`;
    }
  }
}
