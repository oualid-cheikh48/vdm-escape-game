import { Request, Response } from "express";
import * as promotionService from "../services/promotion.service";

export async function getAll(req: Request, res: Response): Promise<void> {
  const promotions = await promotionService.getAllPromotions();
  res.json(promotions);
}

export async function getById(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  const promotion = await promotionService.getPromotionById(id);
  if (!promotion) {
    res.status(404).json({ message: "Promotion introuvable" });
    return;
  }
  res.json(promotion);
}

export async function create(req: Request, res: Response): Promise<void> {
  try {
    const promotion = await promotionService.createPromotion(req.body);
    res.status(201).json(promotion);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
}

export async function update(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  try {
    const promotion = await promotionService.updatePromotion(id, req.body);
    if (!promotion) {
      res.status(404).json({ message: "Promotion introuvable" });
      return;
    }
    res.json(promotion);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
}

export async function remove(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  const deleted = await promotionService.deletePromotion(id);
  if (!deleted) {
    res.status(404).json({ message: "Promotion introuvable" });
    return;
  }
  res.status(204).send();
}
