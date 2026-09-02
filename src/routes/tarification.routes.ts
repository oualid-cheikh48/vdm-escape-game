import { Router } from "express";
import * as tarificationController from "../controllers/tarification.controller";

const router = Router();

router.get("/", tarificationController.getAll);
router.get("/:id", tarificationController.getById);
router.post("/", tarificationController.create);
router.put("/:id", tarificationController.update);
router.delete("/:id", tarificationController.remove);

export default router;
