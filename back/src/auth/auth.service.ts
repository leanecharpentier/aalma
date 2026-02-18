import { Injectable, Req, Res } from '@nestjs/common';
import { auth } from 'src/utils/auth';

@Injectable()
export class AuthService {
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
}
