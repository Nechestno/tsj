
export interface ICredentials {
  login: string;
  password: string;
}

export interface ILoginStore {
  isAuthenticated: boolean;
  loading: boolean;
  error: unknown;
}
