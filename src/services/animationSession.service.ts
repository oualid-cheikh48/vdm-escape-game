import * as animationSessionRepository from "../repositories/animationSession.repository";
import {
  AnimationSession,
  AnimationSessionInput,
} from "../types/animationSession.type";

const ROLES_VALIDES = ["Game Master", "Comédien", "Aide Technique"];

function validateRole(role: string): void {
  if (!ROLES_VALIDES.includes(role)) {
    throw new Error(
      `Rôle invalide, valeurs acceptées : ${ROLES_VALIDES.join(", ")}`
    );
  }
}

export async function getAllAnimationsSession(): Promise<AnimationSession[]> {
  return animationSessionRepository.findAll();
}

export async function getAnimationSessionByIds(
  idSession: number,
  idEmploye: number
): Promise<AnimationSession | null> {
  return animationSessionRepository.findByIds(idSession, idEmploye);
}

export async function createAnimationSession(
  data: AnimationSessionInput
): Promise<AnimationSession> {
  validateRole(data.role_session);
  return animationSessionRepository.create(data);
}

export async function updateAnimationSession(
  idSession: number,
  idEmploye: number,
  roleSession: string
): Promise<AnimationSession | null> {
  validateRole(roleSession);
  return animationSessionRepository.update(idSession, idEmploye, roleSession);
}

export async function deleteAnimationSession(
  idSession: number,
  idEmploye: number
): Promise<boolean> {
  return animationSessionRepository.remove(idSession, idEmploye);
}
