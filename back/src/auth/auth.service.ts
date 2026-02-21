import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Req,
  Res,
} from "@nestjs/common";
import { CompanyService } from "src/company/company.service";
import { auth } from "src/utils/auth";

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
    });
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
        password,
      },
      asResponse: true,
      headers: await req.headers,
    });
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

  async signInSocial(companyId: number, provider: string) {
    const company = await this.companyService.findOne(companyId);

    if (!company) throw new NotFoundException("Organisation introuvable");

    if (provider === "microsoft" && !company.microsoftTenantId) {
      throw new BadRequestException(
        "Microsoft non configuré pour cette organisation",
      );
    }

    if (provider === "google" && !company.googleDomain)
      throw new BadRequestException(
        "Google non configuré pour cette organisation",
      );

    return await auth.api.signInSocial({
      body: {
        provider,
        callbackURL: `${process.env.APP_URL}/auth/callback`,
      },
      asResponse: true,
    });
  }

  async callback(provider: string, companyId: number, @Req() req, @Res() res) {
    const protocol = req.protocol || "http";
    const host = req.headers.host;
    const fullUrl = `${protocol}://${host}${req.url}`;

    const webHeaders = new Headers();
    for (const [key, value] of Object.entries(req.headers)) {
      if (value === undefined) continue;
      const strValue = Array.isArray(value) ? value.join(", ") : String(value);
      webHeaders.set(key, strValue);
    }
    const bodyChunks: Buffer[] = [];
    for await (const chunk of req) {
      bodyChunks.push(chunk);
    }
    const bodyBuffer = Buffer.concat(bodyChunks);

    const webRequest = new Request(fullUrl, {
      method: req.method,
      headers: webHeaders,
      body: ["GET", "HEAD"].includes(req.method) ? undefined : bodyBuffer,
    });

    const result = await auth.handler(webRequest);

    if (!result) {
      return res.status(500).json({ error: "Auth handler returned nothing" });
    }

    if (result.status === 302 || result.status === 301) {
      result.headers.forEach((value, key) => {
        if (!res.headersSent) res.setHeader(key, value);
      });

      const sessionToken = result.headers
        .get("set-cookie")
        ?.split(",")
        .find((c) => c.includes("better-auth.session_token"))
        ?.split(";")[0]
        ?.split("=")
        .slice(1)
        .join("=");

      let session: any = null;
      if (sessionToken) {
        session = await auth.api.getSession({
          headers: new Headers({
            cookie: `better-auth.session_token=${sessionToken}`,
          }),
        });

        const userEmail = session?.user?.email ?? "";
        const company = await this.companyService.findOne(companyId);

        if (provider === "google") {
          if (
            company?.googleDomain &&
            !userEmail.endsWith(`@${company.googleDomain}`)
          ) {
            return res
              .status(403)
              .json({ error: "Email non autorisé pour cette organisation" });
          }
        }

        if (provider === "microsoft") {
          if (
            company?.microsoftTenantId &&
            !userEmail.endsWith(`@${company.microsoftTenantId}`)
          ) {
            return res
              .status(403)
              .json({ error: "Email non autorisé pour cette organisation" });
          }
        }
      }
      return res.status(200).json({
        success: true,
        user: session?.user,
      });
    }
  }
}
