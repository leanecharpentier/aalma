export class CreateUserDto {
  id: string;
  name: string;
  firstname: string;
  lastname: string;
  email: string;
  emailVerified: boolean;
  role_id: number;
  team_id?: number;
}
