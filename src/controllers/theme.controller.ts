import { Request, Response } from "express";
import * as themeService from "../services/theme.service";

export async function getAll(req: Request, res: Response): Promise<void> {
  const themes = await themeService.getAllThemes();
  res.json(themes);
}

export async function getById(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  const theme = await themeService.getThemeById(id);
  if (!theme) {
    res.status(404).json({ message: "Thème introuvable" });
    return;
  }
  res.json(theme);
}

export async function create(req: Request, res: Response): Promise<void> {
  try {
    const theme = await themeService.createTheme(req.body);
    res.status(201).json(theme);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
}

export async function update(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  try {
    const theme = await themeService.updateTheme(id, req.body);
    if (!theme) {
      res.status(404).json({ message: "Thème introuvable" });
      return;
    }
    res.json(theme);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
}

export async function remove(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  const deleted = await themeService.deleteTheme(id);
  if (!deleted) {
    res.status(404).json({ message: "Thème introuvable" });
    return;
  }
  res.status(204).send();
}
