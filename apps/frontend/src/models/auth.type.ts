export const UserSessionEmpty: UserSession = {
  email: "",
  role: "",
};

export const AuthEmptyState: AuthSession = {
  user: UserSessionEmpty,
  accessToken: "",
};

export interface UserSession {
  role: string;
  email: string;
}

export interface AuthSession {
  user: UserSession;
  accessToken: string;
}
