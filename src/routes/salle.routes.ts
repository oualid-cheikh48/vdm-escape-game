import { Router } from "express";
import * as salleController from "../controllers/salle.controller";

const router = Router();

router.get("/", salleController.getAll);
router.get("/:id", salleController.getById);
router.post("/", salleController.create);
router.put("/:id", salleController.update);
router.delete("/:id", salleController.remove);

export default router;
