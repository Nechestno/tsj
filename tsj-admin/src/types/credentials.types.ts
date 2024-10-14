import { NavigateFunction } from 'react-router-dom';

export interface ICredentials {
  login: string;
  password: string;
}

export interface ILoginStore {
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: unknown;
  sendCredentials: (credentials: ICredentials,navigate: NavigateFunction) => void;
  logout: (navigate: NavigateFunction) => void;
}
