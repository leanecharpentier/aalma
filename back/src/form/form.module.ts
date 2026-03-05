import { Module } from "@nestjs/common";
import { FormService } from "./form.service";
import { FormController } from "./form.controller";
import { AuthGuardModule } from "src/auth/auth-guard.module";
import { ActivityLogModule } from "src/activity-log/activity-log.module";

@Module({
  imports: [AuthGuardModule, ActivityLogModule],
  controllers: [FormController],
  providers: [FormService],
})
export class FormModule {}
