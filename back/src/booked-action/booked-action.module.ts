import { Module } from "@nestjs/common";
import { BookedActionController } from "./booked-action.controller";
import { BookedActionService } from "./booked-action.service";
import { ActivityLogModule } from "src/activity-log/activity-log.module";

@Module({
  controllers: [BookedActionController],
  providers: [BookedActionService],
  imports: [ActivityLogModule],
  exports: [BookedActionService],
})
export class BookedActionModule {}