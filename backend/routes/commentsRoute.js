// import express from 'express';
// import Comments from '../models/comments.js';
// import authMiddlewareToken from '../middlewares/authMiddlewareToken.js';

// const router = express.Router();

// router.get('/', authMiddlewareToken, async (req, res) => {
//     try {
//         const comments =await Comments.findAll();
//         res.json(comments);
//     } catch (err) {
//         console.error('Error', err);
//         res.status(500).json({message: 'Erreur lors de la récupération des commentaires.'})
//     }
// });

// export default router;