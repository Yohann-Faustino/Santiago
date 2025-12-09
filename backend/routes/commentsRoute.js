import express from "express";
import commentController from "../controllers/commentsController.js";
import authMiddlewareToken from "../middlewares/authMiddlewareToken.js";

const router = express.Router();

// Ajouter un commentaire
router.post("/", authMiddlewareToken, commentController.addComment);

// Récupérer tous les commentaires
router.get("/", commentController.getAllComments);

// Récupérer un commentaire par ID
router.get("/:id", commentController.getCommentById);

// Mettre à jour un commentaire par ID
router.patch("/:id", authMiddlewareToken, commentController.updateComment);

// Supprimer un commentaire par ID
router.delete("/:id", authMiddlewareToken, commentController.deleteComment);

export default router;
