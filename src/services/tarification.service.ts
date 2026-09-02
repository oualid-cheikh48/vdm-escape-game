import * as tarificationRepository from "../repositories/tarification.repository";
import { Tarification, TarificationInput } from "../types/tarification.type";

function validate(data: TarificationInput): void {
  if (data.prix <= 0) {
    throw new Error("Le prix doit être supérieur à 0");
  }
  if (new Date(data.periode_debut) > new Date(data.periode_fin)) {
    throw new Error(
      "La période de début doit être antérieure à la période de fin"
    );
  }
}

export async function getAllTarifications(): Promise<Tarification[]> {
  return tarificationRepository.findAll();
}

export async function getTarificationById(
  id: number
): Promise<Tarification | null> {
  return tarificationRepository.findById(id);
}

export async function createTarification(
  data: TarificationInput
): Promise<Tarification> {
  validate(data);
  return tarificationRepository.create(data);
}

export async function updateTarification(
  id: number,
  data: TarificationInput
): Promise<Tarification | null> {
  validate(data);
  return tarificationRepository.update(id, data);
}

export async function deleteTarification(id: number): Promise<boolean> {
  return tarificationRepository.remove(id);
}
