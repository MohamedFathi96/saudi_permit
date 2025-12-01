export type Role = "USER" | "ADMIN";

export type User = {
  id: string;
  email: string;
  name?: string;
  role: Role;
};

export type UserProfile = User & {
  createdAt: Date;
  updatedAt: Date;
};

export type AuthResponse = {
  user: User;
  accessToken: string;
};

export type LoginCredentials = {
  email: string;
  password: string;
};

export type RegisterCredentials = {
  email: string;
  password: string;
  name?: string;
};
