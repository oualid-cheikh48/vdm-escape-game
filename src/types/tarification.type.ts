export interface Tarification {
  id_tarif: number;
  prix: number;
  periode_debut: string;
  periode_fin: string;
  type_demande: string;
  id_theme: number;
}

export type TarificationInput = Omit<Tarification, "id_tarif">;
