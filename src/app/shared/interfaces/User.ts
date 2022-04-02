import { Role } from '../enums/Role';

export interface User {
  id: number;
  email: string;
  password: string;
  role: Role;
}
