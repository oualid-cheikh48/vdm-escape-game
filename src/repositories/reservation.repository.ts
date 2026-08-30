import { pool } from "../config/db";
import { Reservation, ReservationInput } from "../types/reservation.type";

export async function findAll(): Promise<Reservation[]> {
  const result = await pool.query<Reservation>(
    "SELECT * FROM reservation ORDER BY id_reservation"
  );
  return result.rows;
}

export async function findById(id: number): Promise<Reservation | null> {
  const result = await pool.query<Reservation>(
    "SELECT * FROM reservation WHERE id_reservation = $1",
    [id]
  );
  return result.rows[0] ?? null;
}

export async function create(data: ReservationInput): Promise<Reservation> {
  const result = await pool.query<Reservation>(
    `INSERT INTO reservation (nb_participants, statut, code_acces, id_client, id_session, id_promotion)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [
      data.nb_participants,
      data.statut,
      data.code_acces,
      data.id_client,
      data.id_session,
      data.id_promotion,
    ]
  );
  return result.rows[0];
}

export async function update(
  id: number,
  data: ReservationInput
): Promise<Reservation | null> {
  const result = await pool.query<Reservation>(
    `UPDATE reservation
     SET nb_participants = $1,
         statut = $2,
         code_acces = $3,
         id_client = $4,
         id_session = $5,
         id_promotion = $6
     WHERE id_reservation = $7
     RETURNING *`,
    [
      data.nb_participants,
      data.statut,
      data.code_acces,
      data.id_client,
      data.id_session,
      data.id_promotion,
      id,
    ]
  );
  return result.rows[0] ?? null;
}

export async function remove(id: number): Promise<boolean> {
  const result = await pool.query(
    "DELETE FROM reservation WHERE id_reservation = $1",
    [id]
  );
  return (result.rowCount ?? 0) > 0;
}
