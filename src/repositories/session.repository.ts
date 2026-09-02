import { pool } from "../config/db";
import { Session, SessionInput } from "../types/session.type";

export async function findAll(): Promise<Session[]> {
  const result = await pool.query<Session>(
    "SELECT * FROM session ORDER BY id_session"
  );
  return result.rows;
}

export async function findById(id: number): Promise<Session | null> {
  const result = await pool.query<Session>(
    "SELECT * FROM session WHERE id_session = $1",
    [id]
  );
  return result.rows[0] ?? null;
}

export async function create(data: SessionInput): Promise<Session> {
  const result = await pool.query<Session>(
    `INSERT INTO session (date_session, heure_debut, statut, id_salle)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [data.date_session, data.heure_debut, data.statut, data.id_salle]
  );
  return result.rows[0];
}

export async function update(
  id: number,
  data: SessionInput
): Promise<Session | null> {
  const result = await pool.query<Session>(
    `UPDATE session
     SET date_session = $1,
         heure_debut = $2,
         statut = $3,
         id_salle = $4
     WHERE id_session = $5
     RETURNING *`,
    [data.date_session, data.heure_debut, data.statut, data.id_salle, id]
  );
  return result.rows[0] ?? null;
}

export async function remove(id: number): Promise<boolean> {
  const result = await pool.query(
    "DELETE FROM session WHERE id_session = $1",
    [id]
  );
  return (result.rowCount ?? 0) > 0;
}
