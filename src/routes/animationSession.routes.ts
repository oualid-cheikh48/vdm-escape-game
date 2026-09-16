import { Router } from "express";
import * as animationSessionController from "../controllers/animationSession.controller";
import { authenticate, requireEmploye } from "../middlewares/auth.middleware";

const router = Router();

// Réservé au personnel (affectation des employés aux sessions).
router.get("/", authenticate, requireEmploye, animationSessionController.getAll);
router.get(
  "/:idSession/:idEmploye",
  authenticate,
  requireEmploye,
  animationSessionController.getByIds
);
router.post("/", authenticate, requireEmploye, animationSessionController.create);
router.put(
  "/:idSession/:idEmploye",
  authenticate,
  requireEmploye,
  animationSessionController.update
);
router.delete(
  "/:idSession/:idEmploye",
  authenticate,
  requireEmploye,
  animationSessionController.remove
);

export default router;
