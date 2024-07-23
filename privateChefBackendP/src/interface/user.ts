export interface User {
  id: number;
  userName: string;
  email: string;
  password: string;
}

export interface GetUserQuery {
  q?: string;
  page?: number;
  size?: number;
}
