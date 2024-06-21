import express from "express";

const router = express.Router();


// On met les routes ici:
// Route pour tester la communication
router.get('/', (req, res) => {
    res.send('Bonjour, le serveur Express est en route.')
});



export default router;