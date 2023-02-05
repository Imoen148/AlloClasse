const express = require('express')
const ecoleController = require('../controllers/ecoleController')
// const authController = require('../controllers/authController');


const router = express.Router();


// router.use(authController.protect)


// NORMAL ROUTES
router
.route('/')
.get( ecoleController.getAllEcoles)
.post(ecoleController.createEcole);

router
.route('/:id')
.get(ecoleController.getEcole)
.patch(ecoleController.updateEcole)
.delete(ecoleController.deleteEcole);

module.exports = router;