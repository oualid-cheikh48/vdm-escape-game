export interface Salle {
  id_salle: number;
  nom_salle: string;
  statut_maintenance: string;
  id_theme: number;
}

export type SalleInput = Omit<Salle, "id_salle">;
