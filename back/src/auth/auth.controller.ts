
import { Controller, Req, Res, Post, UseGuards, Get, Param, Query } from '@nestjs/common';
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
  
  @Get('signin/:provider')
  async oauthSignIn( @Param('provider') provider: string, @Query('companyId') companyId: number, @Req() req, @Res() res) {
    const result = await this.authService.signInSocial(companyId, provider, req, res);

    result.headers.forEach((value, key) => res.setHeader(key, value));
    res.status(result.status).json(await result.json());
  }

  @Get('callback')
  async oauthCallback(@Query('companyId') companyId: number, @Req() req, @Res() res) {
    const result = await this.authService.callback(companyId, req, res);

    result.headers.forEach((value, key) => res.setHeader(key, value));
    res.status(result.status).send(await result.text());
  }
}
