import { pool } from "../config/db";
import { Avis, AvisInput } from "../types/avis.type";

export async function findAll(): Promise<Avis[]> {
  const result = await pool.query<Avis>(
    "SELECT * FROM avis ORDER BY id_avis"
  );
  return result.rows;
}

export async function findById(id: number): Promise<Avis | null> {
  const result = await pool.query<Avis>(
    "SELECT * FROM avis WHERE id_avis = $1",
    [id]
  );
  return result.rows[0] ?? null;
}

export async function create(data: AvisInput): Promise<Avis> {
  const result = await pool.query<Avis>(
    `INSERT INTO avis (note, commentaire, photo_url, id_client, id_theme)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [data.note, data.commentaire, data.photo_url, data.id_client, data.id_theme]
  );
  return result.rows[0];
}

export async function update(
  id: number,
  data: AvisInput
): Promise<Avis | null> {
  const result = await pool.query<Avis>(
    `UPDATE avis
     SET note = $1,
         commentaire = $2,
         photo_url = $3,
         id_client = $4,
         id_theme = $5
     WHERE id_avis = $6
     RETURNING *`,
    [
      data.note,
      data.commentaire,
      data.photo_url,
      data.id_client,
      data.id_theme,
      id,
    ]
  );
  return result.rows[0] ?? null;
}

export async function remove(id: number): Promise<boolean> {
  const result = await pool.query("DELETE FROM avis WHERE id_avis = $1", [
    id,
  ]);
  return (result.rowCount ?? 0) > 0;
}
