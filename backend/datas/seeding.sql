BEGIN;

-- Cette commande est utilisée pour définir l'encodage qui est défini sur UTF-8, qui est un encodage de caractères largement utilisé pour représenter du texte en informatique.
SET CLIENT_ENCODING TO 'UTF-8';

TRUNCATE TABLE "Users", "Appointments", "Comments" RESTART IDENTITY CASCADE;
-- TRUNCATE -> vide dabord la table
-- RESTART IDENTITY -> réinitialise les séquences pour les colonnes id dans les tables Users, Appointments et Comments à leur valeur initiale.
-- CASCADE -> Vide également toutes les tables qui ont des clés étrangères référencées dans chacune des tables.

INSERT INTO "Users" ("firstname","lastname","address","city","postalcode","phone","email","password","role" ) VALUES 
('Yohann','Faustino','15 Rue du Hokage','Konoha','94000','0123456789','yohannfaustino@gmail.com','Yohann666!','admin');

INSERT INTO "Appointments" ("date", "hour", "details" ) VALUES 
('','','');

INSERT INTO "Comments" ("title", "content", "created", "updated") VALUES 
('Beau boulot', 'Rien à en redire, super service !', NOW(), NOW()),
('Bon accueil', 'Personnel très accueillant et à l''écoute.', NOW(), NOW()),
('Service rapide', 'La consultation a été rapide et efficace.', NOW(), NOW()),
('Super expérience', 'Je recommande vivement cette clinique.', NOW(), NOW());

COMMIT;