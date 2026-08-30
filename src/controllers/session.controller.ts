import { Request, Response } from "express";
import * as sessionService from "../services/session.service";

export async function getAll(req: Request, res: Response): Promise<void> {
  const sessions = await sessionService.getAllSessions();
  res.json(sessions);
}

export async function getById(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  const session = await sessionService.getSessionById(id);
  if (!session) {
    res.status(404).json({ message: "Session introuvable" });
    return;
  }
  res.json(session);
}

export async function create(req: Request, res: Response): Promise<void> {
  try {
    const session = await sessionService.createSession(req.body);
    res.status(201).json(session);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
}

export async function update(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  try {
    const session = await sessionService.updateSession(id, req.body);
    if (!session) {
      res.status(404).json({ message: "Session introuvable" });
      return;
    }
    res.json(session);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
}

export async function remove(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  const deleted = await sessionService.deleteSession(id);
  if (!deleted) {
    res.status(404).json({ message: "Session introuvable" });
    return;
  }
  res.status(204).send();
}
