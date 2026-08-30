export interface Session {
  id_session: number;
  date_session: string;
  heure_debut: string;
  statut: string;
  id_salle: number;
}

export type SessionInput = Omit<Session, "id_session">;
