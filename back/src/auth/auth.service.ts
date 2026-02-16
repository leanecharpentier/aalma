import { Injectable, Req, Res } from '@nestjs/common';
import { auth } from 'src/utils/auth';

@Injectable()
export class AuthService {
  async signIn(email: string, password: string) {
    return await auth.api.signInEmail({
      body: {
        email,
        password
      },
    })
  }

  async signUp(name: string, email: string, password: string) {
    console.log(name)
    return await auth.api.signUpEmail({
      body: {
        name,
        email,
        password
      },
    })
  }
}
