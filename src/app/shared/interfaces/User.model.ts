import { Role } from '../enums/Role.enum';

export interface User {
  id?: number;
  email: string;
  password: string;
  role?: Role;
}
