import { State } from '../enums/State.enum';

export interface AuthResponse {
  state: State;
  errorCode?: number;
}
