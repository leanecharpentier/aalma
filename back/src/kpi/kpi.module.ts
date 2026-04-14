import { Module } from "@nestjs/common";
import { KpiController } from "./kpi.controller";

@Module({
  controllers: [KpiController],
  providers: [],
})
export class KpiModule {}
