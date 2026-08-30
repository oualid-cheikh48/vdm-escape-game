import { pool } from "../config/db";
import { Promotion, PromotionInput } from "../types/promotion.type";

export async function findAll(): Promise<Promotion[]> {
  const result = await pool.query<Promotion>(
    "SELECT * FROM promotion ORDER BY id_promotion"
  );
  return result.rows;
}

export async function findById(id: number): Promise<Promotion | null> {
  const result = await pool.query<Promotion>(
    "SELECT * FROM promotion WHERE id_promotion = $1",
    [id]
  );
  return result.rows[0] ?? null;
}

export async function create(data: PromotionInput): Promise<Promotion> {
  const result = await pool.query<Promotion>(
    `INSERT INTO promotion (code_promo, type, valeur)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [data.code_promo, data.type, data.valeur]
  );
  return result.rows[0];
}

export async function update(
  id: number,
  data: PromotionInput
): Promise<Promotion | null> {
  const result = await pool.query<Promotion>(
    `UPDATE promotion
     SET code_promo = $1,
         type = $2,
         valeur = $3
     WHERE id_promotion = $4
     RETURNING *`,
    [data.code_promo, data.type, data.valeur, id]
  );
  return result.rows[0] ?? null;
}

export async function remove(id: number): Promise<boolean> {
  const result = await pool.query(
    "DELETE FROM promotion WHERE id_promotion = $1",
    [id]
  );
  return (result.rowCount ?? 0) > 0;
}
