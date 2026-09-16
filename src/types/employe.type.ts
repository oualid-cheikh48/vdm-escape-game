export interface Employe {
  id_employe: number;
  nom: string;
  prenom: string;
  email: string;
  password_hash: string;
  role: string;
}

export type EmployePublic = Omit<Employe, "password_hash">;

export type EmployeInput = Omit<Employe, "id_employe" | "password_hash">;

export type EmployeCreateData = EmployeInput & { password_hash: string };
