const express = require('express')
const professeurController = require('../controllers/professeurController')
// const authController = require('../controllers/authController');


const router = express.Router();


// router.use(authController.protect)


// NORMAL ROUTES
router
.route('/')
.get( professeurController.getAllProfesseurs)
.post(professeurController.createProfesseur);

router
.route('/:id')
.get(professeurController.getProfesseur)
.patch(professeurController.updateProfesseur)
.delete(professeurController.deleteProfesseur);

module.exports = router;