import * as reservationRepository from "../repositories/reservation.repository";
import { Reservation, ReservationInput } from "../types/reservation.type";

export async function getAllReservations(): Promise<Reservation[]> {
  return reservationRepository.findAll();
}

export async function getReservationById(
  id: number
): Promise<Reservation | null> {
  return reservationRepository.findById(id);
}

export async function createReservation(
  data: ReservationInput
): Promise<Reservation> {
  if (data.nb_participants <= 0) {
    throw new Error("Le nombre de participants doit être supérieur à 0");
  }
  return reservationRepository.create(data);
}

export async function updateReservation(
  id: number,
  data: ReservationInput
): Promise<Reservation | null> {
  if (data.nb_participants <= 0) {
    throw new Error("Le nombre de participants doit être supérieur à 0");
  }
  return reservationRepository.update(id, data);
}

export async function deleteReservation(id: number): Promise<boolean> {
  return reservationRepository.remove(id);
}
