import { Request, Response } from "express";
import * as paiementService from "../services/paiement.service";

export async function getAll(req: Request, res: Response): Promise<void> {
  const paiements = await paiementService.getAllPaiements();
  res.json(paiements);
}

export async function getById(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  const paiement = await paiementService.getPaiementById(id);
  if (!paiement) {
    res.status(404).json({ message: "Paiement introuvable" });
    return;
  }
  res.json(paiement);
}

export async function create(req: Request, res: Response): Promise<void> {
  if (!req.user) {
    res.status(401).json({ message: "Authentification requise" });
    return;
  }
  try {
    const paiement = await paiementService.createPaiement(req.body, req.user);
    res.status(201).json(paiement);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
}

export async function update(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  try {
    const paiement = await paiementService.updatePaiement(id, req.body);
    if (!paiement) {
      res.status(404).json({ message: "Paiement introuvable" });
      return;
    }
    res.json(paiement);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
}

export async function remove(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  const deleted = await paiementService.deletePaiement(id);
  if (!deleted) {
    res.status(404).json({ message: "Paiement introuvable" });
    return;
  }
  res.status(204).send();
}
