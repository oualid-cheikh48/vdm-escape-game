import { pool } from "../config/db";
import {
  Client,
  ClientPublic,
  ClientInput,
  ClientCreateData,
} from "../types/client.type";

const PUBLIC_COLUMNS =
  "id_client, nom, prenom, email, telephone, points_fidelite";

export async function findAll(): Promise<ClientPublic[]> {
  const result = await pool.query<ClientPublic>(
    `SELECT ${PUBLIC_COLUMNS} FROM client ORDER BY id_client`
  );
  return result.rows;
}

export async function findById(id: number): Promise<ClientPublic | null> {
  const result = await pool.query<ClientPublic>(
    `SELECT ${PUBLIC_COLUMNS} FROM client WHERE id_client = $1`,
    [id]
  );
  return result.rows[0] ?? null;
}

// Réservé au service d'authentification : c'est le seul endroit qui a besoin du hash.
export async function findByEmail(email: string): Promise<Client | null> {
  const result = await pool.query<Client>(
    "SELECT * FROM client WHERE email = $1",
    [email]
  );
  return result.rows[0] ?? null;
}

export async function create(data: ClientCreateData): Promise<ClientPublic> {
  const result = await pool.query<ClientPublic>(
    `INSERT INTO client (nom, prenom, email, password_hash, telephone, points_fidelite)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING ${PUBLIC_COLUMNS}`,
    [
      data.nom,
      data.prenom,
      data.email,
      data.password_hash,
      data.telephone,
      data.points_fidelite,
    ]
  );
  return result.rows[0];
}

export async function update(
  id: number,
  data: ClientInput
): Promise<ClientPublic | null> {
  const result = await pool.query<ClientPublic>(
    `UPDATE client
     SET nom = $1,
         prenom = $2,
         email = $3,
         telephone = $4,
         points_fidelite = $5
     WHERE id_client = $6
     RETURNING ${PUBLIC_COLUMNS}`,
    [data.nom, data.prenom, data.email, data.telephone, data.points_fidelite, id]
  );
  return result.rows[0] ?? null;
}

export async function updatePassword(
  id: number,
  password_hash: string
): Promise<void> {
  await pool.query("UPDATE client SET password_hash = $1 WHERE id_client = $2", [
    password_hash,
    id,
  ]);
}

export async function remove(id: number): Promise<boolean> {
  const result = await pool.query("DELETE FROM client WHERE id_client = $1", [
    id,
  ]);
  return (result.rowCount ?? 0) > 0;
}
