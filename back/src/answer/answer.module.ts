import { Module } from "@nestjs/common";
import { AnswerService } from "./answer.service";
import { AnswerController } from "./answer.controller";
import { AuthGuardModule } from "src/auth/auth-guard.module";
import { ActivityLogModule } from "src/activity-log/activity-log.module";

@Module({
  imports: [AuthGuardModule, ActivityLogModule],
  controllers: [AnswerController],
  providers: [AnswerService],
})
export class AnswerModule {}
