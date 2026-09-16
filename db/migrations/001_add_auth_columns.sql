-- Migration : ajout de l'authentification (mots de passe hashés) pour client et employe.
--
-- Le volume Docker (pgdata) ne rejoue PAS db/schema.sql si la base existe déjà.
-- Si votre conteneur postgres tourne déjà, exécutez ce script manuellement :
--
--   docker exec -i vdm_escape_game_db psql -U postgres -d vdm_escape_game < db/migrations/001_add_auth_columns.sql
--
-- Si vous n'avez pas encore de données à conserver, il est plus simple de repartir
-- d'une base propre : docker compose down -v && docker compose up -d
-- (schema.sql sera alors rejoué avec les colonnes déjà incluses).

ALTER TABLE client
  ADD COLUMN IF NOT EXISTS password_hash VARCHAR(255);

ALTER TABLE employe
  ADD COLUMN IF NOT EXISTS email VARCHAR(255),
  ADD COLUMN IF NOT EXISTS password_hash VARCHAR(255);

-- Une fois que chaque compte existant a reçu un mot de passe :
--   - clients : via POST /auth/register (nouveau compte) ou une valeur temporaire à faire
--     réinitialiser ensuite
--   - employés : mise à jour manuelle par un Manager
-- rendre les colonnes obligatoires et l'email employé unique :
--
-- ALTER TABLE client ALTER COLUMN password_hash SET NOT NULL;
-- ALTER TABLE employe ALTER COLUMN email SET NOT NULL;
-- ALTER TABLE employe ALTER COLUMN password_hash SET NOT NULL;
-- ALTER TABLE employe ADD CONSTRAINT employe_email_unique UNIQUE (email);
