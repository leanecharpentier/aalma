import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { CompanyModule } from "./company/company.module";
import { UserModule } from "./user/user.module";
import { TeamModule } from "./team/team.module";
import { RoleModule } from "./role/role.module";
import { ActivityLogModule } from "./activity-log/activity-log.module";
import { QuestionModule } from './question/question.module';
import { PropositionModule } from './proposition/proposition.module';
import { FormTemplateModule } from './form-template/form-template.module';
import { FormModule } from './form/form.module';
import { AnswerModule } from './answer/answer.module';

@Module({
  imports: [
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
