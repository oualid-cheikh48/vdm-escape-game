import { Router } from "express";
import * as sessionController from "../controllers/session.controller";
import { authenticate, requireEmploye } from "../middlewares/auth.middleware";

const router = Router();

// Lecture publique (vitrine du site : catalogue de thèmes/salles/tarifs affiché aux visiteurs).
router.get("/", sessionController.getAll);
router.get("/:id", sessionController.getById);

// Écriture réservée au personnel.
router.post("/", authenticate, requireEmploye, sessionController.create);
router.put("/:id", authenticate, requireEmploye, sessionController.update);
router.delete("/:id", authenticate, requireEmploye, sessionController.remove);

export default router;
