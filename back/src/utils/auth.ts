import { typeormAdapter } from "@hedystia/better-auth-typeorm";
import { betterAuth } from "better-auth";
import { AppDataSource } from "../../DataSource";

export const auth = betterAuth({
  baseURL: process.env.APP_URL || "http://localhost:3000",
  basePath: "/auth",
  trustedOrigins: [process.env.APP_URL || "http://localhost:3000"],
  database: typeormAdapter(AppDataSource),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      redirectURI: `${process.env.APP_URL}/auth/callback/google`,
    },
    microsoft: {
      clientId: process.env.MICROSOFT_CLIENT_ID || "",
      clientSecret: process.env.MICROSOFT_CLIENT_SECRET || "",
      redirectURI: `${process.env.APP_URL}/auth/callback/microsoft`,
    },
  },
  oneTap: undefined,
  advanced: {
    redirectURI: process.env.APP_URL || "http://localhost:3000",
    defaultCookieAttributes: {
      sameSite: "none", // doesn't work with http
      secure: true,
    },
  },
  user: {
    additionalFields: {
      firstname: {
        type: "string",
        required: true,
        defaultValue: "",
      },
      lastname: {
        type: "string",
        required: true,
        defaultValue: "",
      },
    },
    modelName: "user",
  },
});
