import { Module } from "@nestjs/common";
import { TeamService } from "./team.service";
import { TeamController } from "./team.controller";
import { AuthGuardModule } from "src/auth/auth-guard.module";

@Module({
  imports: [AuthGuardModule],
  controllers: [TeamController],
  providers: [TeamService],
})
export class TeamModule {}
