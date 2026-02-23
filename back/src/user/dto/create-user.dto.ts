export class CreateUserDto {
  id: string;
  name: string;
  firstname: string;
  lastname: string;
  email: string;
  role_id: string;
  team_id?: string;
}
