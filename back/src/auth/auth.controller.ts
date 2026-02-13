import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';;

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getAuth(@Req() req: Request, @Res() res: Response) {
    return this.authService.getAuth(req, res);
  }

  @Post()
  postAuth(@Req() req: Request, @Res() res: Response) {
    return this.authService.postAuth(req, res);
  }
}
