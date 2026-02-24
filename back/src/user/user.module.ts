import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { AuthGuardModule } from "src/auth/auth-guard.module";

@Module({
  imports: [AuthGuardModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
