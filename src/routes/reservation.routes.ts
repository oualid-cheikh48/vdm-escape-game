import { Router } from "express";
import * as reservationController from "../controllers/reservation.controller";

const router = Router();

router.get("/", reservationController.getAll);
router.get("/:id", reservationController.getById);
router.post("/", reservationController.create);
router.put("/:id", reservationController.update);
router.delete("/:id", reservationController.remove);

export default router;
