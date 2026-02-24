import { Module } from "@nestjs/common";
import { RoleService } from "./role.service";
import { RoleController } from "./role.controller";
import { AuthGuardModule } from "src/auth/auth-guard.module";

@Module({
  imports: [AuthGuardModule],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {}
