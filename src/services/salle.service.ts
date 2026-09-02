import * as salleRepository from "../repositories/salle.repository";
import { Salle, SalleInput } from "../types/salle.type";

export async function getAllSalles(): Promise<Salle[]> {
  return salleRepository.findAll();
}

export async function getSalleById(id: number): Promise<Salle | null> {
  return salleRepository.findById(id);
}

export async function createSalle(data: SalleInput): Promise<Salle> {
  return salleRepository.create(data);
}

export async function updateSalle(
  id: number,
  data: SalleInput
): Promise<Salle | null> {
  return salleRepository.update(id, data);
}

export async function deleteSalle(id: number): Promise<boolean> {
  return salleRepository.remove(id);
}
