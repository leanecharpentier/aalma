import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const session = await this.authService.getSession(request);

    if (!session?.user) {
      throw new UnauthorizedException("Session invalide ou expirée");
    }

    request.user = session.user;
    request.session = session.session;

    return true;
  }
}