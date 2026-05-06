import { Module } from "@nestjs/common";
import { KpiController } from "./kpi.controller";
import { KpiService } from "./kpi.service";
import { TeamModule } from "src/team/team.module";

@Module({
  controllers: [KpiController],
  providers: [KpiService],
  imports: [TeamModule],
})
export class KpiModule {}
