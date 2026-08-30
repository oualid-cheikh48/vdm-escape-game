import { pool } from "../config/db";
import { Client, ClientInput } from "../types/client.type";

export async function findAll(): Promise<Client[]> {
  const result = await pool.query<Client>(
    "SELECT * FROM client ORDER BY id_client"
  );
  return result.rows;
}

export async function findById(id: number): Promise<Client | null> {
  const result = await pool.query<Client>(
    "SELECT * FROM client WHERE id_client = $1",
    [id]
  );
  return result.rows[0] ?? null;
}

export async function create(data: ClientInput): Promise<Client> {
  const result = await pool.query<Client>(
    `INSERT INTO client (nom, prenom, email, telephone, points_fidelite)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [data.nom, data.prenom, data.email, data.telephone, data.points_fidelite]
  );
  return result.rows[0];
}

export async function update(
  id: number,
  data: ClientInput
): Promise<Client | null> {
  const result = await pool.query<Client>(
    `UPDATE client
     SET nom = $1,
         prenom = $2,
         email = $3,
         telephone = $4,
         points_fidelite = $5
     WHERE id_client = $6
     RETURNING *`,
    [
      data.nom,
      data.prenom,
      data.email,
      data.telephone,
      data.points_fidelite,
      id,
    ]
  );
  return result.rows[0] ?? null;
}

export async function remove(id: number): Promise<boolean> {
  const result = await pool.query("DELETE FROM client WHERE id_client = $1", [
    id,
  ]);
  return (result.rowCount ?? 0) > 0;
}
