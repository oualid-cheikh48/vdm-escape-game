import * as clientRepository from "../repositories/client.repository";
import { Client, ClientInput } from "../types/client.type";

function validate(data: ClientInput): void {
  if (!data.email || !data.email.includes("@")) {
    throw new Error("Email invalide");
  }
  if (data.points_fidelite < 0) {
    throw new Error("Les points de fidélité ne peuvent pas être négatifs");
  }
}

export async function getAllClients(): Promise<Client[]> {
  return clientRepository.findAll();
}

export async function getClientById(id: number): Promise<Client | null> {
  return clientRepository.findById(id);
}

export async function createClient(data: ClientInput): Promise<Client> {
  validate(data);
  return clientRepository.create(data);
}

export async function updateClient(
  id: number,
  data: ClientInput
): Promise<Client | null> {
  validate(data);
  return clientRepository.update(id, data);
}

export async function deleteClient(id: number): Promise<boolean> {
  return clientRepository.remove(id);
}
