import { Injectable, Req, Res } from '@nestjs/common';
import { auth } from 'src/utils/auth';

@Injectable()
export class AuthService {
  async getAuth(@Req() req: Request, @Res() res: Response) {
    // Utilisez votre logique d'authentification ici
    return auth(req, res, 'GET');
  }
  
  async postAuth(@Req() req: Request, @Res() res: Response) {
    // Utilisez votre logique d'authentification ici
    return auth(req, res, 'POST');
  }
}
