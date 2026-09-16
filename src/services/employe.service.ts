import * as employeRepository from "../repositories/employe.repository";
import { hashPassword } from "../utils/password.util";
import { EmployePublic, EmployeInput } from "../types/employe.type";

const MIN_PASSWORD_LENGTH = 8;

function validate(data: EmployeInput): void {
  if (!data.role || data.role.trim() === "") {
    throw new Error("Le rôle est obligatoire");
  }
  if (!data.email || !data.email.includes("@")) {
    throw new Error("Email invalide");
  }
}

function validatePassword(password: string): void {
  if (!password || password.length < MIN_PASSWORD_LENGTH) {
    throw new Error(
      `Le mot de passe doit contenir au moins ${MIN_PASSWORD_LENGTH} caractères`
    );
  }
}

export async function getAllEmployes(): Promise<EmployePublic[]> {
  return employeRepository.findAll();
}

export async function getEmployeById(
  id: number
): Promise<EmployePublic | null> {
  return employeRepository.findById(id);
}

// Réservé aux comptes "Manager" (voir routes/employe.routes.ts) : création d'un
// nouveau compte employé, pas d'auto-inscription possible.
export async function createEmploye(
  data: EmployeInput & { password: string }
): Promise<EmployePublic> {
  validate(data);
  validatePassword(data.password);
  const password_hash = await hashPassword(data.password);
  const { password, ...rest } = data;
  return employeRepository.create({ ...rest, password_hash });
}

export async function updateEmploye(
  id: number,
  data: EmployeInput
): Promise<EmployePublic | null> {
  validate(data);
  return employeRepository.update(id, data);
}

export async function changePassword(
  id: number,
  newPassword: string
): Promise<void> {
  validatePassword(newPassword);
  const password_hash = await hashPassword(newPassword);
  await employeRepository.updatePassword(id, password_hash);
}

export async function deleteEmploye(id: number): Promise<boolean> {
  return employeRepository.remove(id);
}
