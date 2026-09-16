import { Router } from "express";
import * as salleController from "../controllers/salle.controller";
import { authenticate, requireEmploye } from "../middlewares/auth.middleware";

const router = Router();

// Lecture publique (vitrine du site : catalogue de thèmes/salles/tarifs affiché aux visiteurs).
router.get("/", salleController.getAll);
router.get("/:id", salleController.getById);

// Écriture réservée au personnel.
router.post("/", authenticate, requireEmploye, salleController.create);
router.put("/:id", authenticate, requireEmploye, salleController.update);
router.delete("/:id", authenticate, requireEmploye, salleController.remove);

export default router;
