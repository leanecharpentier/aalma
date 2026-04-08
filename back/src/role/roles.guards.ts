import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Roles } from "./role.decorator";
import { AppDataSource } from "DataSource";
import { User } from "typeorm/entities/User";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get(Roles, context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = await AppDataSource.getRepository(User)
      .createQueryBuilder("user")
      .leftJoinAndSelect("user.role", "role")
      .where("user.id = :id", { id: request.user.id })
      .getOne();
    if (user) {
      return this.matchRoles(roles, user.role?.name ? [user.role.name] : []);
    }
    return false;
  }

  matchRoles(allowedRoles: string[], userRoles: string[]): boolean {
    return allowedRoles.some((role) => userRoles.includes(role));
  }
}
