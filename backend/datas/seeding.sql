BEGIN;

-- Cette commande est utilisée pour définir l'encodage qui est défini sur UTF-8, qui est un encodage de caractères largement utilisé pour représenter du texte en informatique.
SET CLIENT_ENCODING TO 'UTF-8';

TRUNCATE TABLE "Users", "Appointments", "Comments" RESTART IDENTITY CASCADE;
-- TRUNCATE -> vide dabord la table
-- RESTART IDENTITY -> réinitialise les séquences pour les colonnes id dans les tables Users, Appointments et Comments à leur valeur initiale.
-- CASCADE -> Vide également toutes les tables qui ont des clés étrangères référencées dans chacune des tables.

INSERT INTO "Users" ("firstname","lastname","address","city","postalcode","phone", "email","password" ) VALUES 
('Francois','Santiago','8, Rue Estienne d''Orves','Créteil','94000','0695451933','decp@decp.fr','Test2024!');

INSERT INTO "Appointments" ("date", "hour", "details" ) VALUES 
('','','');

INSERT INTO "Comments" ("title", "content") VALUES 
('Beau boulot', 'Rien à en redire, super service !');

COMMIT;