import bcrypt from "bcryptjs";

// Coût du hash bcrypt. 12 est un bon compromis sécurité/performance en 2026.
const SALT_ROUNDS = 12;

export async function hashPassword(plain: string): Promise<string> {
  return bcrypt.hash(plain, SALT_ROUNDS);
}

export async function verifyPassword(
  plain: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(plain, hash);
}

// Hash bcrypt valide mais "factice" (ne correspond à aucun mot de passe réel).
// Utilisé quand un email n'existe pas en base, pour que le temps de réponse du
// login reste identique que le compte existe ou non (évite l'énumération de comptes).
export const DUMMY_HASH =
  "$2a$12$CwTycUXWue0Thq9StjUM0uJ8Q4WtAo/GRTS0GDX01r7NUV/o8LSwK";
