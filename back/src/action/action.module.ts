import { Module } from "@nestjs/common";
import { ActionController } from "./action.controller";
import { ActionService } from "./action.service";
import { ActivityLogModule } from "src/activity-log/activity-log.module";

@Module({
  controllers: [ActionController],
  providers: [ActionService],
  imports: [ActivityLogModule],
  exports: [ActionService],
  
})
export class ActionModule {}
