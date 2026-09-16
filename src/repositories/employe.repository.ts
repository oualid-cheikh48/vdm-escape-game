import { pool } from "../config/db";
import {
  Employe,
  EmployePublic,
  EmployeInput,
  EmployeCreateData,
} from "../types/employe.type";

const PUBLIC_COLUMNS = "id_employe, nom, prenom, email, role";

export async function findAll(): Promise<EmployePublic[]> {
  const result = await pool.query<EmployePublic>(
    `SELECT ${PUBLIC_COLUMNS} FROM employe ORDER BY id_employe`
  );
  return result.rows;
}

export async function findById(id: number): Promise<EmployePublic | null> {
  const result = await pool.query<EmployePublic>(
    `SELECT ${PUBLIC_COLUMNS} FROM employe WHERE id_employe = $1`,
    [id]
  );
  return result.rows[0] ?? null;
}

// Réservé au service d'authentification : c'est le seul endroit qui a besoin du hash.
export async function findByEmail(email: string): Promise<Employe | null> {
  const result = await pool.query<Employe>(
    "SELECT * FROM employe WHERE email = $1",
    [email]
  );
  return result.rows[0] ?? null;
}

export async function create(
  data: EmployeCreateData
): Promise<EmployePublic> {
  const result = await pool.query<EmployePublic>(
    `INSERT INTO employe (nom, prenom, email, password_hash, role)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING ${PUBLIC_COLUMNS}`,
    [data.nom, data.prenom, data.email, data.password_hash, data.role]
  );
  return result.rows[0];
}

export async function update(
  id: number,
  data: EmployeInput
): Promise<EmployePublic | null> {
  const result = await pool.query<EmployePublic>(
    `UPDATE employe
     SET nom = $1,
         prenom = $2,
         email = $3,
         role = $4
     WHERE id_employe = $5
     RETURNING ${PUBLIC_COLUMNS}`,
    [data.nom, data.prenom, data.email, data.role, id]
  );
  return result.rows[0] ?? null;
}

export async function updatePassword(
  id: number,
  password_hash: string
): Promise<void> {
  await pool.query(
    "UPDATE employe SET password_hash = $1 WHERE id_employe = $2",
    [password_hash, id]
  );
}

export async function remove(id: number): Promise<boolean> {
  const result = await pool.query(
    "DELETE FROM employe WHERE id_employe = $1",
    [id]
  );
  return (result.rowCount ?? 0) > 0;
}
