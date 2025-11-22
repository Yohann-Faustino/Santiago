BEGIN;

-- Cette commande est utilisée pour définir l'encodage qui est défini sur UTF-8, qui est un encodage de caractères largement utilisé pour représenter du texte en informatique.
SET CLIENT_ENCODING TO 'UTF-8';

TRUNCATE TABLE "Users", "Appointments", "Comments" RESTART IDENTITY CASCADE;
-- TRUNCATE -> vide dabord la table
-- RESTART IDENTITY -> réinitialise les séquences pour les colonnes id dans les tables Users, Appointments et Comments à leur valeur initiale.
-- CASCADE -> Vide également toutes les tables qui ont des clés étrangères référencées dans chacune des tables.

INSERT INTO "Users" ("firstname","lastname","address","city","postalcode","phone","email","password","role" ) VALUES 
('','','','','','','','','');

INSERT INTO "Appointments" ("date", "hour", "details" ) VALUES 
('','','');

INSERT INTO "Comments" ("title","content","created","updated","users_id") VALUES 
('Manuel Dafonte','Une fuite? On appel DECP, sa coule de source !', NOW(), NOW(), 1),
('Rob Hinet','Quand il touche un robinet, l''eau est en sécurité et le client est ravi.', NOW(), NOW(), 1),
('Maria Carré','Grâce à lui, chaque canalisation chante juste et chaque fuite devient une légende du passé.', NOW(), NOW(), 1),
('Robin des Bains','Grâce à eux, ma salle de bain est devenue un vrai château d''eau', NOW(), NOW(), 1);

COMMIT;