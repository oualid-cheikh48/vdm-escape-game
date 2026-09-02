import { pool } from "../config/db";
import { Employe, EmployeInput } from "../types/employe.type";

export async function findAll(): Promise<Employe[]> {
  const result = await pool.query<Employe>(
    "SELECT * FROM employe ORDER BY id_employe"
  );
  return result.rows;
}

export async function findById(id: number): Promise<Employe | null> {
  const result = await pool.query<Employe>(
    "SELECT * FROM employe WHERE id_employe = $1",
    [id]
  );
  return result.rows[0] ?? null;
}

export async function create(data: EmployeInput): Promise<Employe> {
  const result = await pool.query<Employe>(
    `INSERT INTO employe (nom, prenom, role)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [data.nom, data.prenom, data.role]
  );
  return result.rows[0];
}

export async function update(
  id: number,
  data: EmployeInput
): Promise<Employe | null> {
  const result = await pool.query<Employe>(
    `UPDATE employe
     SET nom = $1,
         prenom = $2,
         role = $3
     WHERE id_employe = $4
     RETURNING *`,
    [data.nom, data.prenom, data.role, id]
  );
  return result.rows[0] ?? null;
}

export async function remove(id: number): Promise<boolean> {
  const result = await pool.query(
    "DELETE FROM employe WHERE id_employe = $1",
    [id]
  );
  return (result.rowCount ?? 0) > 0;
}
