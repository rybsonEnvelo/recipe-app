import { State } from '../enums/State';

export interface AuthResponse {
  state: State;
  errorCode?: number;
}
