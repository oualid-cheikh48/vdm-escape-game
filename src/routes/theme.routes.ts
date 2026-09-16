import { Router } from "express";
import * as themeController from "../controllers/theme.controller";
import { authenticate, requireEmploye } from "../middlewares/auth.middleware";

const router = Router();

// Lecture publique (vitrine du site : catalogue de thèmes/salles/tarifs affiché aux visiteurs).
router.get("/", themeController.getAll);
router.get("/:id", themeController.getById);

// Écriture réservée au personnel.
router.post("/", authenticate, requireEmploye, themeController.create);
router.put("/:id", authenticate, requireEmploye, themeController.update);
router.delete("/:id", authenticate, requireEmploye, themeController.remove);

export default router;
