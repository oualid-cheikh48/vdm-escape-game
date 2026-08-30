import { Request, Response } from "express";
import * as animationSessionService from "../services/animationSession.service";

export async function getAll(req: Request, res: Response): Promise<void> {
  const animationsSession =
    await animationSessionService.getAllAnimationsSession();
  res.json(animationsSession);
}

export async function getByIds(req: Request, res: Response): Promise<void> {
  const idSession = Number(req.params.idSession);
  const idEmploye = Number(req.params.idEmploye);
  const animationSession =
    await animationSessionService.getAnimationSessionByIds(
      idSession,
      idEmploye
    );
  if (!animationSession) {
    res.status(404).json({ message: "Affectation introuvable" });
    return;
  }
  res.json(animationSession);
}

export async function create(req: Request, res: Response): Promise<void> {
  try {
    const animationSession =
      await animationSessionService.createAnimationSession(req.body);
    res.status(201).json(animationSession);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
}

export async function update(req: Request, res: Response): Promise<void> {
  const idSession = Number(req.params.idSession);
  const idEmploye = Number(req.params.idEmploye);
  try {
    const animationSession =
      await animationSessionService.updateAnimationSession(
        idSession,
        idEmploye,
        req.body.role_session
      );
    if (!animationSession) {
      res.status(404).json({ message: "Affectation introuvable" });
      return;
    }
    res.json(animationSession);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
}

export async function remove(req: Request, res: Response): Promise<void> {
  const idSession = Number(req.params.idSession);
  const idEmploye = Number(req.params.idEmploye);
  const deleted = await animationSessionService.deleteAnimationSession(
    idSession,
    idEmploye
  );
  if (!deleted) {
    res.status(404).json({ message: "Affectation introuvable" });
    return;
  }
  res.status(204).send();
}
