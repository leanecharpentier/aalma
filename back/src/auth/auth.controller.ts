
import { Controller, Req, Res, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
    async signIn(@Req() req, @Res() res) {
      const { email, password } = req.body;
      const result = await this.authService.signIn(email, password);
      result.headers.forEach((value, key) => {
        res.setHeader(key, value);
      });

      const body = await result.json();
      res.status(result.status).json(body);
    }
    
  @Post('signup') 
  @UseGuards(AuthGuard)
    async signUp(@Req() req, @Res() res) {
      const { name, email, password } = req.body;
      const result = await this.authService.signUp(req, name, email, password);
      result.headers.forEach((value, key) => {
        res.setHeader(key, value);
      });

      const body = await result.json();
      res.status(result.status).json(body);
    }
  
  @Post('signout')
    async signOut(@Req() req, @Res() res) {
      const result = await this.authService.signOut(req);
      result.headers.forEach((value, key) => {
        res.setHeader(key, value);
      });

      const body = await result.json();
      res.status(result.status).json(body);
    }
}
