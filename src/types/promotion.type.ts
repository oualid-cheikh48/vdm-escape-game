export interface Promotion {
  id_promotion: number;
  code_promo: string;
  type: string;
  valeur: number;
}

export type PromotionInput = Omit<Promotion, "id_promotion">;
