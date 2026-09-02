import { Request, Response } from "express";
import * as employeService from "../services/employe.service";

export async function getAll(req: Request, res: Response): Promise<void> {
  const employes = await employeService.getAllEmployes();
  res.json(employes);
}

export async function getById(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  const employe = await employeService.getEmployeById(id);
  if (!employe) {
    res.status(404).json({ message: "Employé introuvable" });
    return;
  }
  res.json(employe);
}

export async function create(req: Request, res: Response): Promise<void> {
  try {
    const employe = await employeService.createEmploye(req.body);
    res.status(201).json(employe);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
}

export async function update(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  try {
    const employe = await employeService.updateEmploye(id, req.body);
    if (!employe) {
      res.status(404).json({ message: "Employé introuvable" });
      return;
    }
    res.json(employe);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
}

export async function remove(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  const deleted = await employeService.deleteEmploye(id);
  if (!deleted) {
    res.status(404).json({ message: "Employé introuvable" });
    return;
  }
  res.status(204).send();
}
