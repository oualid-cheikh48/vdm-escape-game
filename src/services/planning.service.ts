import * as planningRepository from "../repositories/planning.repository";
import { Planning, PlanningInput } from "../types/planning.type";

function validate(data: PlanningInput): void {
  if (data.heure_debut >= data.heure_fin) {
    throw new Error("L'heure de début doit être avant l'heure de fin");
  }
}

export async function getAllPlannings(): Promise<Planning[]> {
  return planningRepository.findAll();
}

export async function getPlanningById(id: number): Promise<Planning | null> {
  return planningRepository.findById(id);
}

export async function createPlanning(data: PlanningInput): Promise<Planning> {
  validate(data);
  return planningRepository.create(data);
}

export async function updatePlanning(
  id: number,
  data: PlanningInput
): Promise<Planning | null> {
  validate(data);
  return planningRepository.update(id, data);
}

export async function deletePlanning(id: number): Promise<boolean> {
  return planningRepository.remove(id);
}
