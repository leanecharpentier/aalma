import { Module } from "@nestjs/common";
import { PropositionService } from "./proposition.service";
import { PropositionController } from "./proposition.controller";
import { AuthGuardModule } from "src/auth/auth-guard.module";
import { ActivityLogModule } from "src/activity-log/activity-log.module";

@Module({
  imports: [AuthGuardModule, ActivityLogModule],
  controllers: [PropositionController],
  providers: [PropositionService],
  exports: [PropositionService],
})
export class PropositionModule {}
