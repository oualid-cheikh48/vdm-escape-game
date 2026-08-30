import { pool } from "../config/db";
import { Planning, PlanningInput } from "../types/planning.type";

export async function findAll(): Promise<Planning[]> {
  const result = await pool.query<Planning>(
    "SELECT * FROM planning ORDER BY id_planning"
  );
  return result.rows;
}

export async function findById(id: number): Promise<Planning | null> {
  const result = await pool.query<Planning>(
    "SELECT * FROM planning WHERE id_planning = $1",
    [id]
  );
  return result.rows[0] ?? null;
}

export async function create(data: PlanningInput): Promise<Planning> {
  const result = await pool.query<Planning>(
    `INSERT INTO planning (date_jour, heure_debut, heure_fin, id_employe, id_salle)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [
      data.date_jour,
      data.heure_debut,
      data.heure_fin,
      data.id_employe,
      data.id_salle,
    ]
  );
  return result.rows[0];
}

export async function update(
  id: number,
  data: PlanningInput
): Promise<Planning | null> {
  const result = await pool.query<Planning>(
    `UPDATE planning
     SET date_jour = $1,
         heure_debut = $2,
         heure_fin = $3,
         id_employe = $4,
         id_salle = $5
     WHERE id_planning = $6
     RETURNING *`,
    [
      data.date_jour,
      data.heure_debut,
      data.heure_fin,
      data.id_employe,
      data.id_salle,
      id,
    ]
  );
  return result.rows[0] ?? null;
}

export async function remove(id: number): Promise<boolean> {
  const result = await pool.query(
    "DELETE FROM planning WHERE id_planning = $1",
    [id]
  );
  return (result.rowCount ?? 0) > 0;
}
