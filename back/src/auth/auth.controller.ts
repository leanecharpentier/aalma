
import { Controller, Req, Res, All, Get, Post } from '@nestjs/common';
import { auth } from 'src/utils/auth';
import { toNodeHandler } from 'better-auth/node';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
    async signIn(@Req() req, @Res() res) {
      const { email, password } = req.body;
      const result = await this.authService.signIn(email, password);
      res.json(result);
    }
    
  @Post('signup')
    async signUp(@Req() req, @Res() res) {
      const { name, email, password } = req.body;
      const result = await this.authService.signUp(req, name, email, password);
      res.json(result);
    }
  
  @Post('signout')
    async signOut(@Req() req, @Res() res) {
      const result = await this.authService.signOut(req);
      res.json(result);
    }
}
