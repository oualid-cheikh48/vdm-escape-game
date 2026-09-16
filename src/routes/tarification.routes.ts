import { Router } from "express";
import * as tarificationController from "../controllers/tarification.controller";
import { authenticate, requireEmploye } from "../middlewares/auth.middleware";

const router = Router();

// Lecture publique (vitrine du site : catalogue de thèmes/salles/tarifs affiché aux visiteurs).
router.get("/", tarificationController.getAll);
router.get("/:id", tarificationController.getById);

// Écriture réservée au personnel.
router.post("/", authenticate, requireEmploye, tarificationController.create);
router.put("/:id", authenticate, requireEmploye, tarificationController.update);
router.delete("/:id", authenticate, requireEmploye, tarificationController.remove);

export default router;
