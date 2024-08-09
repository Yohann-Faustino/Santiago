// Ceci est un router qui découle de la route /coments:

import express from 'express';
import commentController from '../controllers/comentsController.js';

const router = express.Router();

router.post('/', commentController.addComment);
router.get('/', commentController.getAllComments);

export default router;