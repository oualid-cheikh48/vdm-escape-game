export interface Client {
  id_client: number;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  points_fidelite: number;
}

export type ClientInput = Omit<Client, "id_client">;
