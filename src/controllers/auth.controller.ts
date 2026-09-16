import { Request, Response } from "express";
import * as authService from "../services/auth.service";

export async function register(req: Request, res: Response): Promise<void> {
  try {
    const result = await authService.registerClient(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
}

export async function login(req: Request, res: Response): Promise<void> {
  try {
    const result = await authService.loginClient(req.body);
    res.json(result);
  } catch (error) {
    res.status(401).json({ message: (error as Error).message });
  }
}

export async function employeLogin(req: Request, res: Response): Promise<void> {
  try {
    const result = await authService.loginEmploye(req.body);
    res.json(result);
  } catch (error) {
    res.status(401).json({ message: (error as Error).message });
  }
}

// Utile pour que le front vérifie rapidement si le token est encore valide,
// et récupère qui est connecté (id, type, rôle).
export async function me(req: Request, res: Response): Promise<void> {
  res.json({ user: req.user });
}
