const express = require('express')
const locataireController = require('../controllers/locataireController')
//const immeubleController = require('../controllers/immeubleController')
const authController = require('../controllers/authController');


const router = express.Router({ mergeParams: true }); // ALLLOW NESTED ROUTES


router.use(authController.protect)

// SPECIAL ROUTES (AGGREGATION) 
// router
// .route('/locataires-stats')
// .get(locataireController.getStatsPortes)


// NORMAL ROUTES
router
.route('/')
.get( locataireController.getAllLocataires)
.post(/*immeubleController.setImmeubleId, */locataireController.createLocataire);

router
.route('/:id')
.get(locataireController.getLocataire)
.patch(locataireController.updateLocataire)
.delete(locataireController.deleteLocataire);

module.exports = router;