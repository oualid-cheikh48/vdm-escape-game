import { Router } from "express";
import * as animationSessionController from "../controllers/animationSession.controller";

const router = Router();

router.get("/", animationSessionController.getAll);
router.get("/:idSession/:idEmploye", animationSessionController.getByIds);
router.post("/", animationSessionController.create);
router.put("/:idSession/:idEmploye", animationSessionController.update);
router.delete("/:idSession/:idEmploye", animationSessionController.remove);

export default router;
