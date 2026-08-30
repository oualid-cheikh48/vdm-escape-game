import { Request, Response } from "express";
import * as planningService from "../services/planning.service";

export async function getAll(req: Request, res: Response): Promise<void> {
  const plannings = await planningService.getAllPlannings();
  res.json(plannings);
}

export async function getById(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  const planning = await planningService.getPlanningById(id);
  if (!planning) {
    res.status(404).json({ message: "Planning introuvable" });
    return;
  }
  res.json(planning);
}

export async function create(req: Request, res: Response): Promise<void> {
  try {
    const planning = await planningService.createPlanning(req.body);
    res.status(201).json(planning);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
}

export async function update(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  try {
    const planning = await planningService.updatePlanning(id, req.body);
    if (!planning) {
      res.status(404).json({ message: "Planning introuvable" });
      return;
    }
    res.json(planning);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
}

export async function remove(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  const deleted = await planningService.deletePlanning(id);
  if (!deleted) {
    res.status(404).json({ message: "Planning introuvable" });
    return;
  }
  res.status(204).send();
}
