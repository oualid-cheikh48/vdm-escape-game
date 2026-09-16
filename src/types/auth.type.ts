export type UserType = "client" | "employe";

export interface JwtPayload {
  id: number;
  type: UserType;
  email: string;
  role?: string; // uniquement pour les employés
}

export interface RegisterClientInput {
  nom: string;
  prenom: string;
  email: string;
  telephone?: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}
