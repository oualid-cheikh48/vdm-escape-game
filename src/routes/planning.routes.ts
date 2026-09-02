import { Router } from "express";
import * as planningController from "../controllers/planning.controller";

const router = Router();

router.get("/", planningController.getAll);
router.get("/:id", planningController.getById);
router.post("/", planningController.create);
router.put("/:id", planningController.update);
router.delete("/:id", planningController.remove);

export default router;
