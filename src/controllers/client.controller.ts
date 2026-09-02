import { Request, Response } from "express";
import * as clientService from "../services/client.service";

export async function getAll(req: Request, res: Response): Promise<void> {
  const clients = await clientService.getAllClients();
  res.json(clients);
}

export async function getById(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  const client = await clientService.getClientById(id);
  if (!client) {
    res.status(404).json({ message: "Client introuvable" });
    return;
  }
  res.json(client);
}

export async function create(req: Request, res: Response): Promise<void> {
  try {
    const client = await clientService.createClient(req.body);
    res.status(201).json(client);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
}

export async function update(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  try {
    const client = await clientService.updateClient(id, req.body);
    if (!client) {
      res.status(404).json({ message: "Client introuvable" });
      return;
    }
    res.json(client);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
}

export async function remove(req: Request, res: Response): Promise<void> {
  const id = Number(req.params.id);
  const deleted = await clientService.deleteClient(id);
  if (!deleted) {
    res.status(404).json({ message: "Client introuvable" });
    return;
  }
  res.status(204).send();
}
