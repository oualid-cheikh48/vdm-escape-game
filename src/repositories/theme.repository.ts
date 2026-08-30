import { pool } from "../config/db";
import { Theme, ThemeInput } from "../types/theme.type";

export async function findAll(): Promise<Theme[]> {
  const result = await pool.query<Theme>(
    "SELECT * FROM theme ORDER BY id_theme"
  );
  return result.rows;
}

export async function findById(id: number): Promise<Theme | null> {
  const result = await pool.query<Theme>(
    "SELECT * FROM theme WHERE id_theme = $1",
    [id]
  );
  return result.rows[0] ?? null;
}

export async function create(data: ThemeInput): Promise<Theme> {
  const result = await pool.query<Theme>(
    `INSERT INTO theme (nom, description, duree, difficulte)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [data.nom, data.description, data.duree, data.difficulte]
  );
  return result.rows[0];
}

export async function update(
  id: number,
  data: ThemeInput
): Promise<Theme | null> {
  const result = await pool.query<Theme>(
    `UPDATE theme
     SET nom = $1,
         description = $2,
         duree = $3,
         difficulte = $4
     WHERE id_theme = $5
     RETURNING *`,
    [data.nom, data.description, data.duree, data.difficulte, id]
  );
  return result.rows[0] ?? null;
}

export async function remove(id: number): Promise<boolean> {
  const result = await pool.query("DELETE FROM theme WHERE id_theme = $1", [
    id,
  ]);
  return (result.rowCount ?? 0) > 0;
}
