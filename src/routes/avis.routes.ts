import { Router, Request } from "express";
import * as avisController from "../controllers/avis.controller";
import * as avisRepository from "../repositories/avis.repository";
import { authenticate, ownerOrEmploye } from "../middlewares/auth.middleware";

const router = Router();

async function ownerOfAvis(req: Request) {
  const avis = await avisRepository.findById(Number(req.params.id));
  return avis?.id_client;
}

// Lecture publique (vitrine du site : les avis sont affichés à tous).
router.get("/", avisController.getAll);
router.get("/:id", avisController.getById);

// Écriture réservée aux clients/employés authentifiés.
router.post("/", authenticate, avisController.create);
router.put("/:id", authenticate, ownerOrEmploye(ownerOfAvis), avisController.update);
router.delete("/:id", authenticate, ownerOrEmploye(ownerOfAvis), avisController.remove);

export default router;
