import { betterAuth } from "better-auth";
import { typeormAdapter } from "@hedystia/better-auth-typeorm";
import { AppDataSource } from "../../DataSource"


export const auth = betterAuth({
    database: typeormAdapter(AppDataSource),
    emailAndPassword: { 
        enabled: true, 
    }, 
});