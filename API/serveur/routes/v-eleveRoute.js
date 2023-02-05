const express = require('express')
const eleveController = require('../controllers/eleveController')
// const authController = require('../controllers/authController');


const router = express.Router();


// router.use(authController.protect)


// NORMAL ROUTES
router
.route('/')
.get( eleveController.getAllEleves)
.post(eleveController.createEleve);

router
.route('/:id')
.get(eleveController.getEleve)
.patch(eleveController.updateEleve)
.delete(eleveController.deleteEleve);

module.exports = router;