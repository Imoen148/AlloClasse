const express = require('express')
const bonDeReparationController = require('../controllers/bonDeReparationsController')
const immeubleController = require('../controllers/immeubleController')
const authController = require('../controllers/authController');


const router = express.Router({ mergeParams: true }); // NESTED ROUTES


router.use(authController.protect)

//SPECIAL ROUTES (AGGREGATIONS)
// router
// .route('/bonDeReparations-stats')
// .get(bonDeReparationController.getStatsPortes)

//NORMAL ROUTES
router
.route('/')
.get(bonDeReparationController.getAllBonDeReparations)
.post(immeubleController.setImmeubleId ,bonDeReparationController.createBonDeReparation);

router
.route('/:id')
.get(bonDeReparationController.getBonDeReparation)
.patch(bonDeReparationController.updateBonDeReparation)
.delete(bonDeReparationController.deleteBonDeReparation);

module.exports = router;