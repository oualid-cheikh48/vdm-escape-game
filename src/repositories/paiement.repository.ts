import { pool } from "../config/db";
import { Paiement, PaiementInput } from "../types/paiement.type";

export async function findAll(): Promise<Paiement[]> {
  const result = await pool.query<Paiement>(
    "SELECT * FROM paiement ORDER BY id_paiement"
  );
  return result.rows;
}

export async function findById(id: number): Promise<Paiement | null> {
  const result = await pool.query<Paiement>(
    "SELECT * FROM paiement WHERE id_paiement = $1",
    [id]
  );
  return result.rows[0] ?? null;
}

export async function create(data: PaiementInput): Promise<Paiement> {
  const result = await pool.query<Paiement>(
    `INSERT INTO paiement (montant, mode_paiement, date_paiement, id_reservation)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [data.montant, data.mode_paiement, data.date_paiement, data.id_reservation]
  );
  return result.rows[0];
}

export async function update(
  id: number,
  data: PaiementInput
): Promise<Paiement | null> {
  const result = await pool.query<Paiement>(
    `UPDATE paiement
     SET montant = $1,
         mode_paiement = $2,
         date_paiement = $3,
         id_reservation = $4
     WHERE id_paiement = $5
     RETURNING *`,
    [
      data.montant,
      data.mode_paiement,
      data.date_paiement,
      data.id_reservation,
      id,
    ]
  );
  return result.rows[0] ?? null;
}

export async function remove(id: number): Promise<boolean> {
  const result = await pool.query(
    "DELETE FROM paiement WHERE id_paiement = $1",
    [id]
  );
  return (result.rowCount ?? 0) > 0;
}
