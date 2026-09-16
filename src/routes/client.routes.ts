import { Router } from "express";
import * as clientController from "../controllers/client.controller";
import {
  authenticate,
  requireEmploye,
  ownerOrEmploye,
} from "../middlewares/auth.middleware";

const router = Router();

// Liste complète réservée au personnel (données de tous les clients).
router.get("/", authenticate, requireEmploye, clientController.getAll);

// Un client peut consulter sa propre fiche ; le personnel peut consulter n'importe laquelle.
router.get(
  "/:id",
  authenticate,
  ownerOrEmploye(async (req) => Number(req.params.id)),
  clientController.getById
);

// Création manuelle d'un compte client par le personnel.
// L'inscription publique passe par POST /auth/register.
router.post("/", authenticate, requireEmploye, clientController.create);

router.put(
  "/:id",
  authenticate,
  ownerOrEmploye(async (req) => Number(req.params.id)),
  clientController.update
);

router.put(
  "/:id/password",
  authenticate,
  ownerOrEmploye(async (req) => Number(req.params.id)),
  clientController.changePassword
);

router.delete(
  "/:id",
  authenticate,
  ownerOrEmploye(async (req) => Number(req.params.id)),
  clientController.remove
);

export default router;
