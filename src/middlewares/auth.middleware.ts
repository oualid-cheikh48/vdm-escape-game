import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt.util";
import { JwtPayload } from "../types/auth.type";

// Étend le type Request d'Express pour porter l'utilisateur authentifié.
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

/**
 * Vérifie la présence et la validité d'un token JWT (header "Authorization: Bearer <token>").
 * Alimente req.user si le token est valide, sinon renvoie 401.
 */
export function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    res.status(401).json({ message: "Authentification requise" });
    return;
  }

  const token = header.slice("Bearer ".length).trim();
  try {
    req.user = verifyToken(token);
    next();
  } catch {
    res.status(401).json({ message: "Token invalide ou expiré" });
  }
}

/**
 * Réserve l'accès aux comptes employés (n'importe quel rôle).
 * Doit être utilisé après authenticate().
 */
export function requireEmploye(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (!req.user || req.user.type !== "employe") {
    res.status(403).json({ message: "Accès réservé au personnel" });
    return;
  }
  next();
}

/**
 * Réserve l'accès aux employés ayant l'un des rôles listés (ex: "Manager").
 * Doit être utilisé après authenticate().
 */
export function requireRoles(...roles: string[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (
      !req.user ||
      req.user.type !== "employe" ||
      !roles.includes(req.user.role ?? "")
    ) {
      res.status(403).json({ message: "Droits insuffisants" });
      return;
    }
    next();
  };
}

/**
 * Autorise l'accès si l'utilisateur est un employé (accès total), OU si c'est le
 * client propriétaire de la ressource demandée. `fetchOwnerId` doit retourner
 * l'id_client propriétaire de la ressource (ou null/undefined si introuvable).
 * Doit être utilisé après authenticate().
 */
export function ownerOrEmploye(
  fetchOwnerId: (req: Request) => Promise<number | null | undefined>
) {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    if (!req.user) {
      res.status(401).json({ message: "Authentification requise" });
      return;
    }
    if (req.user.type === "employe") {
      next();
      return;
    }
    const ownerId = await fetchOwnerId(req);
    if (ownerId === null || ownerId === undefined) {
      res.status(404).json({ message: "Ressource introuvable" });
      return;
    }
    if (ownerId !== req.user.id) {
      res
        .status(403)
        .json({ message: "Accès refusé : cette ressource ne vous appartient pas" });
      return;
    }
    next();
  };
}
