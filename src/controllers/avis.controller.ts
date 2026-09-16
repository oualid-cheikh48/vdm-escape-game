import { Request, Response } from "express";
import * as avisService from "../services/avis.service";

export async function getAll(req: Request, res: Response): Promise<void> {
  const avis = await avisService.getAllAvis();
  res.json(avis);
}

export async function getById(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  const avis = await avisService.getAvisById(id);
  if (!avis) {
    res.status(404).json({ message: "Avis introuvable" });
    return;
  }
  res.json(avis);
}

export async function create(req: Request, res: Response): Promise<void> {
  try {
    const body = { ...req.body };
    if (req.user?.type === "client") {
      body.id_client = req.user.id;
    }
    const avis = await avisService.createAvis(body);
    res.status(201).json(avis);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
}

export async function update(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  try {
    const avis = await avisService.updateAvis(id, req.body);
    if (!avis) {
      res.status(404).json({ message: "Avis introuvable" });
      return;
    }
    res.json(avis);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
}

export async function remove(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  const deleted = await avisService.deleteAvis(id);
  if (!deleted) {
    res.status(404).json({ message: "Avis introuvable" });
    return;
  }
  res.status(204).send();
}
