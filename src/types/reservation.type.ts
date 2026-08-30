export interface Reservation {
  id_reservation: number;
  nb_participants: number;
  statut: string;
  code_acces: string;
  id_client: number;
  id_session: number;
  id_promotion: number | null;
}

export type ReservationInput = Omit<Reservation, "id_reservation">;
