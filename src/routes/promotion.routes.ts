import { Router } from "express";
import * as promotionController from "../controllers/promotion.controller";
import { authenticate, requireEmploye } from "../middlewares/auth.middleware";

const router = Router();

// Réservé au personnel de bout en bout (codes promo / plannings internes).
router.get("/", authenticate, requireEmploye, promotionController.getAll);
router.get("/:id", authenticate, requireEmploye, promotionController.getById);
router.post("/", authenticate, requireEmploye, promotionController.create);
router.put("/:id", authenticate, requireEmploye, promotionController.update);
router.delete("/:id", authenticate, requireEmploye, promotionController.remove);

export default router;
