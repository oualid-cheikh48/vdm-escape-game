export interface Paiement {
  id_paiement: number;
  montant: number;
  mode_paiement: string;
  date_paiement: string;
  id_reservation: number;
}

export type PaiementInput = Omit<Paiement, "id_paiement">;
