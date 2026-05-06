import { Module } from "@nestjs/common";
import { TeamService } from "./team.service";
import { TeamController } from "./team.controller";
import { AuthGuardModule } from "src/auth/auth-guard.module";
import { ActivityLogModule } from "src/activity-log/activity-log.module";

@Module({
  imports: [AuthGuardModule, ActivityLogModule],
  controllers: [TeamController],
  providers: [TeamService],
  exports: [TeamService],
})
export class TeamModule {}
