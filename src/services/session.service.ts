import * as sessionRepository from "../repositories/session.repository";
import { Session, SessionInput } from "../types/session.type";

const STATUTS_VALIDES = ["Disponible", "Réservée", "Maintenance"];

function validate(data: SessionInput): void {
  if (!STATUTS_VALIDES.includes(data.statut)) {
    throw new Error(
      `Statut invalide, valeurs acceptées : ${STATUTS_VALIDES.join(", ")}`
    );
  }
}

export async function getAllSessions(): Promise<Session[]> {
  return sessionRepository.findAll();
}

export async function getSessionById(id: number): Promise<Session | null> {
  return sessionRepository.findById(id);
}

export async function createSession(data: SessionInput): Promise<Session> {
  validate(data);
  return sessionRepository.create(data);
}

export async function updateSession(
  id: number,
  data: SessionInput
): Promise<Session | null> {
  validate(data);
  return sessionRepository.update(id, data);
}

export async function deleteSession(id: number): Promise<boolean> {
  return sessionRepository.remove(id);
}
