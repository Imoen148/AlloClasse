const express = require('express')
const immeubleController = require('../controllers/immeubleController')
const fournisseurRouter = require('../routes/fournisseurRoutes')
const bonDeReparationRouter = require('../routes/bonDeReparationRoute')
const authController = require('../controllers/authController');


const router = express.Router();


router.use(authController.protect)

// NESTED ROUTES
router.use('/:immeubleId/fournisseurs', fournisseurRouter)
router.use('/:immeubleId/bonDeReparations', bonDeReparationRouter)

// SPECIAL ROUTES (AGGREGATION)
router
.route('/immeubles-stats')
.get(immeubleController.getStatsPortes)


// NORMAL ROUTES
router
.route('/')
.get( immeubleController.getAllImmeubles)
.post(immeubleController.createImmeuble);

router
.route('/:id')
.get(immeubleController.getImmeuble)
.patch(immeubleController.updateImmeuble)
.delete( 
    authController.restrictTo('admin', 'proprietaire'), 
    immeubleController.deleteImmeuble
);


module.exports = router;