import { Module } from "@nestjs/common";
import { ActivityLogModule } from "src/activity-log/activity-log.module";
import { NotificationService } from "./notification.service";

@Module({
  imports: [ActivityLogModule],
  providers: [NotificationService],
  exports: [NotificationService],
})
export class NotificationModule {}
