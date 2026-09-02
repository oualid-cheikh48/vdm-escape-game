export interface Employe {
  id_employe: number;
  nom: string;
  prenom: string;
  role: string;
}

export type EmployeInput = Omit<Employe, "id_employe">;
