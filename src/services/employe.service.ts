import * as employeRepository from "../repositories/employe.repository";
import { Employe, EmployeInput } from "../types/employe.type";

function validate(data: EmployeInput): void {
  if (!data.role || data.role.trim() === "") {
    throw new Error("Le rôle est obligatoire");
  }
}

export async function getAllEmployes(): Promise<Employe[]> {
  return employeRepository.findAll();
}

export async function getEmployeById(id: number): Promise<Employe | null> {
  return employeRepository.findById(id);
}

export async function createEmploye(data: EmployeInput): Promise<Employe> {
  validate(data);
  return employeRepository.create(data);
}

export async function updateEmploye(
  id: number,
  data: EmployeInput
): Promise<Employe | null> {
  validate(data);
  return employeRepository.update(id, data);
}

export async function deleteEmploye(id: number): Promise<boolean> {
  return employeRepository.remove(id);
}
