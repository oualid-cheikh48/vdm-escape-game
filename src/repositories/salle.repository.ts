import { pool } from "../config/db";
import { Salle, SalleInput } from "../types/salle.type";

export async function findAll(): Promise<Salle[]> {
  const result = await pool.query<Salle>(
    "SELECT * FROM salle ORDER BY id_salle"
  );
  return result.rows;
}

export async function findById(id: number): Promise<Salle | null> {
  const result = await pool.query<Salle>(
    "SELECT * FROM salle WHERE id_salle = $1",
    [id]
  );
  return result.rows[0] ?? null;
}

export async function create(data: SalleInput): Promise<Salle> {
  const result = await pool.query<Salle>(
    `INSERT INTO salle (nom_salle, statut_maintenance, id_theme)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [data.nom_salle, data.statut_maintenance, data.id_theme]
  );
  return result.rows[0];
}

export async function update(
  id: number,
  data: SalleInput
): Promise<Salle | null> {
  const result = await pool.query<Salle>(
    `UPDATE salle
     SET nom_salle = $1,
         statut_maintenance = $2,
         id_theme = $3
     WHERE id_salle = $4
     RETURNING *`,
    [data.nom_salle, data.statut_maintenance, data.id_theme, id]
  );
  return result.rows[0] ?? null;
}

export async function remove(id: number): Promise<boolean> {
  const result = await pool.query("DELETE FROM salle WHERE id_salle = $1", [
    id,
  ]);
  return (result.rowCount ?? 0) > 0;
}
