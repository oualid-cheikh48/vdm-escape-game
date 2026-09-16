-- Schéma de la base de données VDM Escape Game
-- Généré à partir de entités.txt (racine du projet)
-- Ordre de création : tables sans dépendance d'abord, puis tables avec clés étrangères

CREATE TABLE theme (
    id_theme SERIAL PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    description TEXT,
    duree INTEGER NOT NULL,
    difficulte VARCHAR(50)
);

CREATE TABLE client (
    id_client SERIAL PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    prenom VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    telephone VARCHAR(20),
    points_fidelite INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE promotion (
    id_promotion SERIAL PRIMARY KEY,
    code_promo VARCHAR(50) NOT NULL UNIQUE,
    type VARCHAR(20) NOT NULL,
    valeur NUMERIC(10, 2) NOT NULL
);

CREATE TABLE employe (
    id_employe SERIAL PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    prenom VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL
);

CREATE TABLE salle (
    id_salle SERIAL PRIMARY KEY,
    nom_salle VARCHAR(255) NOT NULL,
    statut_maintenance VARCHAR(50),
    id_theme INTEGER NOT NULL REFERENCES theme (id_theme)
);

CREATE TABLE session (
    id_session SERIAL PRIMARY KEY,
    date_session DATE NOT NULL,
    heure_debut TIME NOT NULL,
    statut VARCHAR(20) NOT NULL,
    id_salle INTEGER NOT NULL REFERENCES salle (id_salle)
);

CREATE TABLE reservation (
    id_reservation SERIAL PRIMARY KEY,
    nb_participants INTEGER NOT NULL,
    statut VARCHAR(20) NOT NULL,
    code_acces VARCHAR(50),
    id_client INTEGER NOT NULL REFERENCES client (id_client),
    id_session INTEGER NOT NULL REFERENCES session (id_session),
    id_promotion INTEGER REFERENCES promotion (id_promotion)
);

CREATE TABLE paiement (
    id_paiement SERIAL PRIMARY KEY,
    montant NUMERIC(10, 2) NOT NULL,
    mode_paiement VARCHAR(20) NOT NULL,
    date_paiement TIMESTAMP NOT NULL,
    id_reservation INTEGER NOT NULL REFERENCES reservation (id_reservation)
);

CREATE TABLE avis (
    id_avis SERIAL PRIMARY KEY,
    note INTEGER NOT NULL,
    commentaire TEXT,
    photo_url VARCHAR(500),
    id_client INTEGER NOT NULL REFERENCES client (id_client),
    id_theme INTEGER NOT NULL REFERENCES theme (id_theme)
);

CREATE TABLE tarification (
    id_tarif SERIAL PRIMARY KEY,
    prix NUMERIC(10, 2) NOT NULL,
    periode_debut DATE NOT NULL,
    periode_fin DATE NOT NULL,
    type_demande VARCHAR(50),
    id_theme INTEGER NOT NULL REFERENCES theme (id_theme)
);

CREATE TABLE planning (
    id_planning SERIAL PRIMARY KEY,
    date_jour DATE NOT NULL,
    heure_debut TIME NOT NULL,
    heure_fin TIME NOT NULL,
    id_employe INTEGER NOT NULL REFERENCES employe (id_employe),
    id_salle INTEGER NOT NULL REFERENCES salle (id_salle)
);

CREATE TABLE animation_session (
    id_session INTEGER NOT NULL REFERENCES session (id_session),
    id_employe INTEGER NOT NULL REFERENCES employe (id_employe),
    role_session VARCHAR(50) NOT NULL,
    PRIMARY KEY (id_session, id_employe)
);
