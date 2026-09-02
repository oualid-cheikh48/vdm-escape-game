export interface Theme {
  id_theme: number;
  nom: string;
  description: string;
  duree: number;
  difficulte: string;
}

export type ThemeInput = Omit<Theme, "id_theme">;
