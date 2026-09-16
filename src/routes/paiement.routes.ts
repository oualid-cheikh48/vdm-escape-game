import { Router, Request } from "express";
import * as paiementController from "../controllers/paiement.controller";
import * as paiementRepository from "../repositories/paiement.repository";
import * as reservationRepository from "../repositories/reservation.repository";
import {
  authenticate,
  requireEmploye,
  ownerOrEmploye,
} from "../middlewares/auth.middleware";

const router = Router();

async function ownerOfPaiement(req: Request) {
  const paiement = await paiementRepository.findById(Number(req.params.id));
  if (!paiement) return null;
  const reservation = await reservationRepository.findById(paiement.id_reservation);
  return reservation?.id_client;
}

// Liste complète réservée au personnel (données financières sensibles).
router.get("/", authenticate, requireEmploye, paiementController.getAll);

// Un client ne peut consulter que ses propres paiements.
router.get(
  "/:id",
  authenticate,
  ownerOrEmploye(ownerOfPaiement),
  paiementController.getById
);

// Un client règle sa propre réservation ; vérifié en profondeur dans le service
// (createPaiement compare id_reservation.id_client au client authentifié).
router.post("/", authenticate, paiementController.create);

// Modification/suppression d'un paiement réservées au personnel (traçabilité,
// remboursements, corrections) : un client ne doit jamais pouvoir altérer un
// paiement une fois effectué.
router.put("/:id", authenticate, requireEmploye, paiementController.update);
router.delete("/:id", authenticate, requireEmploye, paiementController.remove);

export default router;
