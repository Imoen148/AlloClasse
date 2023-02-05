const express = require('express')
const fournisseurController = require('../controllers/fournisseurController')
const immeubleController = require('../controllers/immeubleController')
const authController = require('../controllers/authController');


const router = express.Router({ mergeParams: true }); // ALLLOW NESTED ROUTES


router.use(authController.protect)

// SPECIAL ROUTES (AGGREGATION) 
// router
// .route('/fournisseurs-stats')
// .get(fournisseurController.getStatsPortes)


// NORMAL ROUTES
router
.route('/')
.get( fournisseurController.getAllFournisseurs)
.post(immeubleController.setImmeubleId, fournisseurController.createFournisseur);

router
.route('/:id')
.get(fournisseurController.getFournisseur)
.patch(fournisseurController.updateFournisseur)
.delete(fournisseurController.deleteFournisseur);

module.exports = router;