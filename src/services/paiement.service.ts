import * as paiementRepository from "../repositories/paiement.repository";
import { Paiement, PaiementInput } from "../types/paiement.type";

const MODES_VALIDES = ["CB", "PayPal", "Espèces"];

function validate(data: PaiementInput): void {
  if (data.montant <= 0) {
    throw new Error("Le montant doit être supérieur à 0");
  }
  if (!MODES_VALIDES.includes(data.mode_paiement)) {
    throw new Error(
      `Mode de paiement invalide, valeurs acceptées : ${MODES_VALIDES.join(", ")}`
    );
  }
}

export async function getAllPaiements(): Promise<Paiement[]> {
  return paiementRepository.findAll();
}

export async function getPaiementById(id: number): Promise<Paiement | null> {
  return paiementRepository.findById(id);
}

export async function createPaiement(data: PaiementInput): Promise<Paiement> {
  validate(data);
  return paiementRepository.create(data);
}

export async function updatePaiement(
  id: number,
  data: PaiementInput
): Promise<Paiement | null> {
  validate(data);
  return paiementRepository.update(id, data);
}

export async function deletePaiement(id: number): Promise<boolean> {
  return paiementRepository.remove(id);
}
