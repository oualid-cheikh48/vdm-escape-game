import { Router, Request, Response, NextFunction } from "express";
import * as employeController from "../controllers/employe.controller";
import {
  authenticate,
  requireEmploye,
  requireRoles,
  ownerOrEmploye,
} from "../middlewares/auth.middleware";

const router = Router();

// Rôles habilités à gérer les comptes employés (RH).
// À assigner en base pour Valérie Dupont / Martin Lefèvre.
const ADMIN_ROLES = ["Manager"];

// Pour le mot de passe : l'employé peut changer le sien, un Manager peut changer
// celui de n'importe qui. Contrairement à ownerOrEmploye, un simple employé ne
// doit PAS pouvoir réinitialiser le mot de passe d'un collègue.
function selfOrManager(req: Request, res: Response, next: NextFunction): void {
  if (!req.user) {
    res.status(401).json({ message: "Authentification requise" });
    return;
  }
  const isSelf = req.user.id === Number(req.params.id);
  const isManager = ADMIN_ROLES.includes(req.user.role ?? "");
  if (!isSelf && !isManager) {
    res.status(403).json({ message: "Accès refusé" });
    return;
  }
  next();
}

router.get("/", authenticate, requireEmploye, employeController.getAll);

router.get(
  "/:id",
  authenticate,
  ownerOrEmploye(async (req) => Number(req.params.id)),
  employeController.getById
);

// Seuls les comptes "Manager" peuvent créer/modifier/supprimer un compte employé.
router.post(
  "/",
  authenticate,
  requireRoles(...ADMIN_ROLES),
  employeController.create
);
router.put(
  "/:id",
  authenticate,
  requireRoles(...ADMIN_ROLES),
  employeController.update
);
router.delete(
  "/:id",
  authenticate,
  requireRoles(...ADMIN_ROLES),
  employeController.remove
);

// Un employé peut changer son propre mot de passe ; un Manager peut aussi le faire.
router.put(
  "/:id/password",
  authenticate,
  selfOrManager,
  employeController.changePassword
);

export default router;
