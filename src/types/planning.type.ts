export interface Planning {
  id_planning: number;
  date_jour: string;
  heure_debut: string;
  heure_fin: string;
  id_employe: number;
  id_salle: number;
}

export type PlanningInput = Omit<Planning, "id_planning">;
