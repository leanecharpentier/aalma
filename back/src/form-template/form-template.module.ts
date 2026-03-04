import { Module } from "@nestjs/common";
import { FormTemplateService } from "./form-template.service";
import { FormTemplateController } from "./form-template.controller";
import { AuthGuardModule } from "src/auth/auth-guard.module";
import { ActivityLogModule } from "src/activity-log/activity-log.module";

@Module({
  imports: [AuthGuardModule, ActivityLogModule],
  controllers: [FormTemplateController],
  providers: [FormTemplateService],
})
export class FormTemplateModule {}
