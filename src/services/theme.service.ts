import * as themeRepository from "../repositories/theme.repository";
import { Theme, ThemeInput } from "../types/theme.type";

function validate(data: ThemeInput): void {
  if (data.duree <= 0) {
    throw new Error("La durée doit être supérieure à 0");
  }
}

export async function getAllThemes(): Promise<Theme[]> {
  return themeRepository.findAll();
}

export async function getThemeById(id: number): Promise<Theme | null> {
  return themeRepository.findById(id);
}

export async function createTheme(data: ThemeInput): Promise<Theme> {
  validate(data);
  return themeRepository.create(data);
}

export async function updateTheme(
  id: number,
  data: ThemeInput
): Promise<Theme | null> {
  validate(data);
  return themeRepository.update(id, data);
}

export async function deleteTheme(id: number): Promise<boolean> {
  return themeRepository.remove(id);
}
