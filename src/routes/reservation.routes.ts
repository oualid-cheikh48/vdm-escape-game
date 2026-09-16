import { Router, Request } from "express";
import * as reservationController from "../controllers/reservation.controller";
import * as reservationRepository from "../repositories/reservation.repository";
import {
  authenticate,
  requireEmploye,
  ownerOrEmploye,
} from "../middlewares/auth.middleware";

const router = Router();

async function ownerOfReservation(req: Request) {
  const reservation = await reservationRepository.findById(Number(req.params.id));
  return reservation?.id_client;
}

// Liste complète réservée au personnel (staff : suivi de toutes les réservations).
router.get("/", authenticate, requireEmploye, reservationController.getAll);

router.get(
  "/:id",
  authenticate,
  ownerOrEmploye(ownerOfReservation),
  reservationController.getById
);

// Un client crée sa propre réservation ; un employé peut réserver pour un client
// (utile pour une réservation prise au comptoir ou par téléphone).
router.post("/", authenticate, reservationController.create);

router.put(
  "/:id",
  authenticate,
  ownerOrEmploye(ownerOfReservation),
  reservationController.update
);

router.delete(
  "/:id",
  authenticate,
  ownerOrEmploye(ownerOfReservation),
  reservationController.remove
);

export default router;
