import { Request, Response } from "express";
import * as reservationService from "../services/reservation.service";

export async function getAll(req: Request, res: Response): Promise<void> {
  const reservations = await reservationService.getAllReservations();
  res.json(reservations);
}

export async function getById(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  const reservation = await reservationService.getReservationById(id);
  if (!reservation) {
    res.status(404).json({ message: "Réservation introuvable" });
    return;
  }
  res.json(reservation);
}

export async function create(req: Request, res: Response): Promise<void> {
  try {
    const body = { ...req.body };
    // Un client ne peut réserver que pour lui-même : on ignore toute tentative
    // de forcer un autre id_client dans le corps de la requête.
    if (req.user?.type === "client") {
      body.id_client = req.user.id;
    }
    const reservation = await reservationService.createReservation(body);
    res.status(201).json(reservation);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
}

export async function update(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  try {
    const body = { ...req.body };
    if (req.user?.type === "client") {
      body.id_client = req.user.id;
    }
    const reservation = await reservationService.updateReservation(id, body);
    if (!reservation) {
      res.status(404).json({ message: "Réservation introuvable" });
      return;
    }
    res.json(reservation);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
}

export async function remove(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  const deleted = await reservationService.deleteReservation(id);
  if (!deleted) {
    res.status(404).json({ message: "Réservation introuvable" });
    return;
  }
  res.status(204).send();
}
