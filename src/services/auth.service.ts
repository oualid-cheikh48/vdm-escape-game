import * as clientRepository from "../repositories/client.repository";
import * as employeRepository from "../repositories/employe.repository";
import { hashPassword, verifyPassword, DUMMY_HASH } from "../utils/password.util";
import { signToken } from "../utils/jwt.util";
import { RegisterClientInput, LoginInput } from "../types/auth.type";
import { ClientPublic } from "../types/client.type";
import { EmployePublic } from "../types/employe.type";

const MIN_PASSWORD_LENGTH = 8;

export async function registerClient(
  data: RegisterClientInput
): Promise<{ client: ClientPublic; token: string }> {
  if (!data.email || !data.email.includes("@")) {
    throw new Error("Email invalide");
  }
  if (!data.password || data.password.length < MIN_PASSWORD_LENGTH) {
    throw new Error(
      `Le mot de passe doit contenir au moins ${MIN_PASSWORD_LENGTH} caractères`
    );
  }
  const existing = await clientRepository.findByEmail(data.email);
  if (existing) {
    throw new Error("Un compte existe déjà avec cet email");
  }

  const password_hash = await hashPassword(data.password);
  const client = await clientRepository.create({
    nom: data.nom,
    prenom: data.prenom,
    email: data.email,
    telephone: data.telephone ?? "",
    points_fidelite: 0,
    password_hash,
  });

  const token = signToken({
    id: client.id_client,
    type: "client",
    email: client.email,
  });

  return { client, token };
}

export async function loginClient(
  data: LoginInput
): Promise<{ client: ClientPublic; token: string }> {
  const client = await clientRepository.findByEmail(data.email);
  // On compare toujours contre un hash (réel ou factice) pour que le temps de
  // réponse ne révèle pas si l'email existe en base.
  const valid = await verifyPassword(
    data.password,
    client ? client.password_hash : DUMMY_HASH
  );

  if (!client || !valid) {
    throw new Error("Identifiants invalides");
  }

  const token = signToken({
    id: client.id_client,
    type: "client",
    email: client.email,
  });

  const { password_hash, ...publicClient } = client;
  return { client: publicClient, token };
}

export async function loginEmploye(
  data: LoginInput
): Promise<{ employe: EmployePublic; token: string }> {
  const employe = await employeRepository.findByEmail(data.email);
  const valid = await verifyPassword(
    data.password,
    employe ? employe.password_hash : DUMMY_HASH
  );

  if (!employe || !valid) {
    throw new Error("Identifiants invalides");
  }

  const token = signToken({
    id: employe.id_employe,
    type: "employe",
    email: employe.email,
    role: employe.role,
  });

  const { password_hash, ...publicEmploye } = employe;
  return { employe: publicEmploye, token };
}
