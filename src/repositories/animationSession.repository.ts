import { pool } from "../config/db";
import {
  AnimationSession,
  AnimationSessionInput,
} from "../types/animationSession.type";

export async function findAll(): Promise<AnimationSession[]> {
  const result = await pool.query<AnimationSession>(
    "SELECT * FROM animation_session ORDER BY id_session, id_employe"
  );
  return result.rows;
}

export async function findByIds(
  idSession: number,
  idEmploye: number
): Promise<AnimationSession | null> {
  const result = await pool.query<AnimationSession>(
    "SELECT * FROM animation_session WHERE id_session = $1 AND id_employe = $2",
    [idSession, idEmploye]
  );
  return result.rows[0] ?? null;
}

export async function create(
  data: AnimationSessionInput
): Promise<AnimationSession> {
  const result = await pool.query<AnimationSession>(
    `INSERT INTO animation_session (id_session, id_employe, role_session)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [data.id_session, data.id_employe, data.role_session]
  );
  return result.rows[0];
}

export async function update(
  idSession: number,
  idEmploye: number,
  roleSession: string
): Promise<AnimationSession | null> {
  const result = await pool.query<AnimationSession>(
    `UPDATE animation_session
     SET role_session = $1
     WHERE id_session = $2 AND id_employe = $3
     RETURNING *`,
    [roleSession, idSession, idEmploye]
  );
  return result.rows[0] ?? null;
}

export async function remove(
  idSession: number,
  idEmploye: number
): Promise<boolean> {
  const result = await pool.query(
    "DELETE FROM animation_session WHERE id_session = $1 AND id_employe = $2",
    [idSession, idEmploye]
  );
  return (result.rowCount ?? 0) > 0;
}
