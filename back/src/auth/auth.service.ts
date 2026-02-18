import { BadRequestException, Injectable, NotFoundException, Req, Res } from '@nestjs/common';
import { CompanyService } from 'src/company/company.service';
import { auth } from 'src/utils/auth';

@Injectable()
export class AuthService {
  constructor(private readonly companyService: CompanyService) {}
  /**
   * Connecte un utilisateur avec son email et mot de passe.
   * @param email Email de l'utilisateur
   * @param password Mot de passe de l'utilisateur
   * @returns Résultat de la tentative de connexion
   */
  async signIn(email: string, password: string) {
    return await auth.api.signInEmail({
      body: {
        email,
        password,
        rememberMe: true,
      },
      asResponse: true,
    })
  }

  /**
   * Inscrit un nouvel utilisateur avec nom, email et mot de passe.
   * @param name Nom de l'utilisateur
   * @param email Email de l'utilisateur
   * @param password Mot de passe de l'utilisateur
   * @returns Résultat de la tentative d'inscription
   */
  async signUp(@Req() req, name: string, email: string, password: string) {
    return await auth.api.signUpEmail({
      body: {
        name,
        email,
        password
      },
      asResponse: true,
      headers: await req.headers,
    })
  }

  /**
   * Déconnecte l'utilisateur actuellement authentifié.
   * @returns Résultat de la déconnexion
   */
  async signOut(@Req() req) {
    return await auth.api.signOut({
      headers: await req.headers,
      asResponse: true,
    });
  }

  /**
   * Récupère la session de l'utilisateur à partir de la requête, en vérifiant les en-têtes d'authentification.
   * @param request 
   * @returns Session de l'utilisateur ou null si la session est invalide ou expirée
   */
  async getSession(request: Request) {
    return auth.api.getSession({ headers: request.headers });
  }

  async signInSocial(companyId: number, provider: string, @Req() req, @Res() res) {
    const company = await this.companyService.findOne(companyId );

    if (!company) throw new NotFoundException('Organisation introuvable');

    if (provider === 'microsoft' && !company.microsoftTenantId) {
      throw new BadRequestException('Microsoft non configuré pour cette organisation');
    }
      
    if (provider === 'google' && !company.googleDomain)
      throw new BadRequestException('Google non configuré pour cette organisation');

    return await auth.api.signInSocial({
      body: {
        provider,                                    
        callbackURL: `${process.env.APP_URL}/auth/callback`,
      },
      asResponse: true,
    });
  }

  async callback(companyId: number, @Req() req, @Res() res) {
    const result = await auth.handler(req as any);
    const body = await result.json();

    const company = await this.companyService.findOne(companyId);
    const userEmail: string = body.user?.email ?? '';

    if (company.googleDomain && !userEmail.endsWith(`@${company.googleDomain}`)) {
      return res.status(403).json({ error: 'Email non autorisé pour cette organisation' });
    }
    return result;
  }
}
