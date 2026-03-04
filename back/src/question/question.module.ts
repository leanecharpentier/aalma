import { Module } from "@nestjs/common";
import { ActivityLogModule } from "src/activity-log/activity-log.module";
import { AuthGuardModule } from "src/auth/auth-guard.module";
import { PropositionModule } from "src/proposition/proposition.module";
import { QuestionController } from "./question.controller";
import { QuestionService } from "./question.service";

@Module({
  imports: [AuthGuardModule, ActivityLogModule, PropositionModule],
  controllers: [QuestionController],
  providers: [QuestionService],
})
export class QuestionModule {}
