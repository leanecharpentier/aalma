import { Module } from "@nestjs/common";
import { CompanyService } from "./company.service";
import { CompanyController } from "./company.controller";
import { AuthGuardModule } from "src/auth/auth-guard.module";
import { ActivityLogModule } from "src/activity-log/activity-log.module";

@Module({
  imports: [AuthGuardModule, ActivityLogModule],
  controllers: [CompanyController],
  providers: [CompanyService],
  exports: [CompanyService],
})
export class CompanyModule {}
