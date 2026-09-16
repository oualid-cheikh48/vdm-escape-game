import { Router } from "express";
import * as planningController from "../controllers/planning.controller";
import { authenticate, requireEmploye } from "../middlewares/auth.middleware";

const router = Router();

// Réservé au personnel de bout en bout (codes promo / plannings internes).
router.get("/", authenticate, requireEmploye, planningController.getAll);
router.get("/:id", authenticate, requireEmploye, planningController.getById);
router.post("/", authenticate, requireEmploye, planningController.create);
router.put("/:id", authenticate, requireEmploye, planningController.update);
router.delete("/:id", authenticate, requireEmploye, planningController.remove);

export default router;
