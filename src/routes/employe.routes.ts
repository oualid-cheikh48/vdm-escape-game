import { Router } from "express";
import * as employeController from "../controllers/employe.controller";

const router = Router();

router.get("/", employeController.getAll);
router.get("/:id", employeController.getById);
router.post("/", employeController.create);
router.put("/:id", employeController.update);
router.delete("/:id", employeController.remove);

export default router;
