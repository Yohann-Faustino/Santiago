BEGIN;

-- Cette commande est utilisée pour définir l'encodage qui est défini sur UTF-8, qui est un encodage de caractères largement utilisé pour représenter du texte en informatique
SET CLIENT_ENCODING TO 'UTF-8';

TRUNCATE TABLE "Customers", "Appointments", "Comments" RESTART IDENTITY CASCADE;
-- TRUNCATE -> vide dabord la table
-- RESTART IDENTITY -> réinitialise les séquences pour les colonnes id dans les tables Utilisateurs et Ingredients à leur valeur initiale
-- CASCADE -> Vide également toutes les tables qui ont des clés étrangères référencées dans chacune des tables

INSERT INTO "Customers" ("firstname", "lastname", "addressCustomer", "phone", "email", "passwordHash" ) VALUES 
INSERT INTO "Appointments" ("dateAppointment", "hourAppointment", "details", "customers_id" ) VALUES 
INSERT INTO "Comments" ("title", "customers_id" ) VALUES 
