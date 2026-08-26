import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ScheduleModule } from "@nestjs/schedule";
import { ActivityLogModule } from "./activity-log/activity-log.module";
import { AnswerModule } from "./answer/answer.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { CompanyModule } from "./company/company.module";
import { FormModule } from "./form/form.module";
import { FormTemplateModule } from "./form-template/form-template.module";
import { NotificationModule } from "./notification/notification.module";
import { PropositionModule } from "./proposition/proposition.module";
import { QuestionModule } from "./question/question.module";
import { RoleModule } from "./role/role.module";
import { TeamModule } from "./team/team.module";
import { UserModule } from "./user/user.module";
import { ActionModule } from "./action/action.module";
import { CategoryModule } from "./category/category.module";
import { KpiModule } from "./kpi/kpi.module";

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot(),
    AuthModule,
    CompanyModule,
    UserModule,
    TeamModule,
    RoleModule,
    ActivityLogModule,
    QuestionModule,
    PropositionModule,
    FormTemplateModule,
    FormModule,
    AnswerModule,
    NotificationModule,
    ActionModule,
    CategoryModule,
    KpiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
