import * as clientRepository from "../repositories/client.repository";
import { hashPassword } from "../utils/password.util";
import { ClientPublic, ClientInput } from "../types/client.type";

const MIN_PASSWORD_LENGTH = 8;

function validate(data: ClientInput): void {
  if (!data.email || !data.email.includes("@")) {
    throw new Error("Email invalide");
  }
  if (data.points_fidelite < 0) {
    throw new Error("Les points de fidélité ne peuvent pas être négatifs");
  }
}

function validatePassword(password: string): void {
  if (!password || password.length < MIN_PASSWORD_LENGTH) {
    throw new Error(
      `Le mot de passe doit contenir au moins ${MIN_PASSWORD_LENGTH} caractères`
    );
  }
}

export async function getAllClients(): Promise<ClientPublic[]> {
  return clientRepository.findAll();
}

export async function getClientById(id: number): Promise<ClientPublic | null> {
  return clientRepository.findById(id);
}

// Création manuelle par un employé (ex: compte créé au comptoir).
// L'inscription publique passe par auth.service.registerClient.
export async function createClient(
  data: ClientInput & { password: string }
): Promise<ClientPublic> {
  validate(data);
  validatePassword(data.password);
  const password_hash = await hashPassword(data.password);
  const { password, ...rest } = data;
  return clientRepository.create({ ...rest, password_hash });
}

export async function updateClient(
  id: number,
  data: ClientInput
): Promise<ClientPublic | null> {
  validate(data);
  return clientRepository.update(id, data);
}

export async function changePassword(
  id: number,
  newPassword: string
): Promise<void> {
  validatePassword(newPassword);
  const password_hash = await hashPassword(newPassword);
  await clientRepository.updatePassword(id, password_hash);
}

export async function deleteClient(id: number): Promise<boolean> {
  return clientRepository.remove(id);
}
