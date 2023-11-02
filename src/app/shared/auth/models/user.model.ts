export interface User {
  id: number;
  username: string;
  roles: UserRole[];
}

export enum UserRole {
  User = 'ROLE_USER',
  Admin = 'ROLE_ADMIN',
}

export interface UserCredentials {
  token: string;
  type: string;
  algorithm: string;
  expiresAt: string;
}

