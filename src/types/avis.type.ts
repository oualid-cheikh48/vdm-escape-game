export interface Avis {
  id_avis: number;
  note: number;
  commentaire: string;
  photo_url: string;
  id_client: number;
  id_theme: number;
}

export type AvisInput = Omit<Avis, "id_avis">;
