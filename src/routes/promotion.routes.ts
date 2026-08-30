import { Router } from "express";
import * as promotionController from "../controllers/promotion.controller";

const router = Router();

router.get("/", promotionController.getAll);
router.get("/:id", promotionController.getById);
router.post("/", promotionController.create);
router.put("/:id", promotionController.update);
router.delete("/:id", promotionController.remove);

export default router;
