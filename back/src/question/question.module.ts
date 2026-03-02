import { Module } from "@nestjs/common";
import { QuestionService } from "./question.service";
import { QuestionController } from "./question.controller";
import { ActivityLogModule } from "src/activity-log/activity-log.module";
import { AuthGuardModule } from "src/auth/auth-guard.module";

@Module({
  imports: [AuthGuardModule, ActivityLogModule],
  controllers: [QuestionController],
  providers: [QuestionService],
})
export class QuestionModule {}
