import * as avisRepository from "../repositories/avis.repository";
import { Avis, AvisInput } from "../types/avis.type";

function validate(data: AvisInput): void {
  if (data.note < 0 || data.note > 5) {
    throw new Error("La note doit être comprise entre 0 et 5");
  }
}

export async function getAllAvis(): Promise<Avis[]> {
  return avisRepository.findAll();
}

export async function getAvisById(id: number): Promise<Avis | null> {
  return avisRepository.findById(id);
}

export async function createAvis(data: AvisInput): Promise<Avis> {
  validate(data);
  return avisRepository.create(data);
}

export async function updateAvis(
  id: number,
  data: AvisInput
): Promise<Avis | null> {
  validate(data);
  return avisRepository.update(id, data);
}

export async function deleteAvis(id: number): Promise<boolean> {
  return avisRepository.remove(id);
}
