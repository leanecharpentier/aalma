import { betterAuth } from "better-auth";
import { typeormAdapter } from "@hedystia/better-auth-typeorm";
import { AppDataSource } from "../../DataSource"


export const auth = betterAuth({
    database: typeormAdapter(AppDataSource),
    emailAndPassword: { 
        enabled: true, 
    }, 
    socialProviders: {
    google: {
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            hd: process.env.GOOGLE_ALLOWED_DOMAIN,
        },
        microsoft: {
            clientId: process.env.MICROSOFT_CLIENT_ID!,
            clientSecret: process.env.MICROSOFT_CLIENT_SECRET!,
            tenantId: process.env.MICROSOFT_TENANT_ID!, 
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