import { Request, Response } from "express";
import * as tarificationService from "../services/tarification.service";

export async function getAll(req: Request, res: Response): Promise<void> {
  const tarifications = await tarificationService.getAllTarifications();
  res.json(tarifications);
}

export async function getById(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  const tarification = await tarificationService.getTarificationById(id);
  if (!tarification) {
    res.status(404).json({ message: "Tarification introuvable" });
    return;
  }
  res.json(tarification);
}

export async function create(req: Request, res: Response): Promise<void> {
  try {
    const tarification = await tarificationService.createTarification(
      req.body
    );
    res.status(201).json(tarification);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
}

export async function update(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  try {
    const tarification = await tarificationService.updateTarification(
      id,
      req.body
    );
    if (!tarification) {
      res.status(404).json({ message: "Tarification introuvable" });
      return;
    }
    res.json(tarification);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
}

export async function remove(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  const deleted = await tarificationService.deleteTarification(id);
  if (!deleted) {
    res.status(404).json({ message: "Tarification introuvable" });
    return;
  }
  res.status(204).send();
}
