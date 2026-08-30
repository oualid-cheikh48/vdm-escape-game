import * as promotionRepository from "../repositories/promotion.repository";
import { Promotion, PromotionInput } from "../types/promotion.type";

const TYPES_VALIDES = ["Pourcentage", "Fixe"];

function validate(data: PromotionInput): void {
  if (!TYPES_VALIDES.includes(data.type)) {
    throw new Error(
      `Type invalide, valeurs acceptées : ${TYPES_VALIDES.join(", ")}`
    );
  }
  if (data.valeur <= 0) {
    throw new Error("La valeur doit être supérieure à 0");
  }
  if (data.type === "Pourcentage" && data.valeur > 100) {
    throw new Error("Un pourcentage ne peut pas dépasser 100");
  }
}

export async function getAllPromotions(): Promise<Promotion[]> {
  return promotionRepository.findAll();
}

export async function getPromotionById(
  id: number
): Promise<Promotion | null> {
  return promotionRepository.findById(id);
}

export async function createPromotion(
  data: PromotionInput
): Promise<Promotion> {
  validate(data);
  return promotionRepository.create(data);
}

export async function updatePromotion(
  id: number,
  data: PromotionInput
): Promise<Promotion | null> {
  validate(data);
  return promotionRepository.update(id, data);
}

export async function deletePromotion(id: number): Promise<boolean> {
  return promotionRepository.remove(id);
}
