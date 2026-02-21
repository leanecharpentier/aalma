
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
    res.cookie('pending_company_id', String(companyId), { 
      httpOnly: true, 
      maxAge: 5 * 60 * 1000 
    });
    const result = await this.authService.signInSocial(companyId, provider, req, res);
    result.headers.forEach((value, key) => res.setHeader(key, value));
    const body = await result.json();

    if (body.redirect && body.url) {
      return res.redirect(302, body.url);
    }
    res.status(result.status).json(body);
  }


  @Get('callback/:provider')
  async oauthCallback(@Param('provider') provider: string, @Req() req, @Res() res) {
    try {
      const companyId = parseInt(req.cookies['pending_company_id'] ?? '0');
      res.clearCookie('pending_company_id');
      const result = await this.authService.callback(provider, companyId, req, res);

      if (!result) return;

      if (result.status === 301 || result.status === 302) {
        const location = result.headers.get('location');
        return res.redirect(result.status, location);
      }
      
      result.headers.forEach((value, key) => res.setHeader(key, value));
      res.status(result.status).send(await result.text());
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }
}
