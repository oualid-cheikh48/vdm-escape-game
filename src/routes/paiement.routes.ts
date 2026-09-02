import { Router } from "express";
import * as paiementController from "../controllers/paiement.controller";

const router = Router();

router.get("/", paiementController.getAll);
router.get("/:id", paiementController.getById);
router.post("/", paiementController.create);
router.put("/:id", paiementController.update);
router.delete("/:id", paiementController.remove);

export default router;
