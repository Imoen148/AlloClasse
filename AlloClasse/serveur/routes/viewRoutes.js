const express = require('express');
const viewController = require('../controllers/viewController')

const router = express.Router();


router.get('/', viewController.getAccueil);
router.get('/connexion', viewController.getPageConnexion)
router.get('/enregistrement', viewController.getPageEnregistrement)

module.exports = router;