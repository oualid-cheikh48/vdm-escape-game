import { Request, Response } from "express";
import * as salleService from "../services/salle.service";

export async function getAll(req: Request, res: Response): Promise<void> {
  const salles = await salleService.getAllSalles();
  res.json(salles);
}

export async function getById(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  const salle = await salleService.getSalleById(id);
  if (!salle) {
    res.status(404).json({ message: "Salle introuvable" });
    return;
  }
  res.json(salle);
}

export async function create(req: Request, res: Response): Promise<void> {
  try {
    const salle = await salleService.createSalle(req.body);
    res.status(201).json(salle);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
}

export async function update(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  try {
    const salle = await salleService.updateSalle(id, req.body);
    if (!salle) {
      res.status(404).json({ message: "Salle introuvable" });
      return;
    }
    res.json(salle);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
}

export async function remove(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  const deleted = await salleService.deleteSalle(id);
  if (!deleted) {
    res.status(404).json({ message: "Salle introuvable" });
    return;
  }
  res.status(204).send();
}
