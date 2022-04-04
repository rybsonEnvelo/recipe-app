import { User } from './User.model';

export interface AuthObject {
  accessToken: string;
  user: User;
}
