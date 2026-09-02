import { Router } from "express";
import * as avisController from "../controllers/avis.controller";

const router = Router();

router.get("/", avisController.getAll);
router.get("/:id", avisController.getById);
router.post("/", avisController.create);
router.put("/:id", avisController.update);
router.delete("/:id", avisController.remove);

export default router;
