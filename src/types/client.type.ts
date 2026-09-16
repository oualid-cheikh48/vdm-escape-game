export interface Client {
  id_client: number;
  nom: string;
  prenom: string;
  email: string;
  password_hash: string;
  telephone: string;
  points_fidelite: number;
}

// Version exposée par l'API : ne contient jamais le hash du mot de passe.
export type ClientPublic = Omit<Client, "password_hash">;

// Champs modifiables via les routes CRUD classiques (le mot de passe se gère à part).
export type ClientInput = Omit<Client, "id_client" | "password_hash">;

// Ce que le repository écrit réellement en base à la création (hash déjà calculé).
export type ClientCreateData = ClientInput & { password_hash: string };
