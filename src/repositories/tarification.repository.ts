import { pool } from "../config/db";
import { Tarification, TarificationInput } from "../types/tarification.type";

export async function findAll(): Promise<Tarification[]> {
  const result = await pool.query<Tarification>(
    "SELECT * FROM tarification ORDER BY id_tarif"
  );
  return result.rows;
}

export async function findById(id: number): Promise<Tarification | null> {
  const result = await pool.query<Tarification>(
    "SELECT * FROM tarification WHERE id_tarif = $1",
    [id]
  );
  return result.rows[0] ?? null;
}

export async function create(
  data: TarificationInput
): Promise<Tarification> {
  const result = await pool.query<Tarification>(
    `INSERT INTO tarification (prix, periode_debut, periode_fin, type_demande, id_theme)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [
      data.prix,
      data.periode_debut,
      data.periode_fin,
      data.type_demande,
      data.id_theme,
    ]
  );
  return result.rows[0];
}

export async function update(
  id: number,
  data: TarificationInput
): Promise<Tarification | null> {
  const result = await pool.query<Tarification>(
    `UPDATE tarification
     SET prix = $1,
         periode_debut = $2,
         periode_fin = $3,
         type_demande = $4,
         id_theme = $5
     WHERE id_tarif = $6
     RETURNING *`,
    [
      data.prix,
      data.periode_debut,
      data.periode_fin,
      data.type_demande,
      data.id_theme,
      id,
    ]
  );
  return result.rows[0] ?? null;
}

export async function remove(id: number): Promise<boolean> {
  const result = await pool.query(
    "DELETE FROM tarification WHERE id_tarif = $1",
    [id]
  );
  return (result.rowCount ?? 0) > 0;
}
