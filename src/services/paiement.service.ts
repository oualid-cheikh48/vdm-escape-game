import * as paiementRepository from "../repositories/paiement.repository";
import * as reservationRepository from "../repositories/reservation.repository";
import { Paiement, PaiementInput } from "../types/paiement.type";

const MODES_VALIDES = ["CB", "PayPal", "Espèces"];

interface Requester {
  id: number;
  type: "client" | "employe";
}

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

export async function createPaiement(
  data: PaiementInput,
  requester: Requester
): Promise<Paiement> {
  validate(data);

  // On vérifie que la réservation existe et, si c'est un client qui paie,
  // qu'il règle bien sa propre réservation (et pas celle de quelqu'un d'autre).
  const reservation = await reservationRepository.findById(data.id_reservation);
  if (!reservation) {
    throw new Error("Réservation introuvable");
  }
  if (requester.type === "client" && reservation.id_client !== requester.id) {
    throw new Error("Vous ne pouvez régler que vos propres réservations");
  }

  return paiementRepository.create(data);
}

// Modification/suppression réservées au personnel (traçabilité financière) :
// contrôle d'accès géré au niveau de la route (requireEmploye).
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
