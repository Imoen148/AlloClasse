const express = require('express')
const porteController = require('../controllers/porteController');
const authController = require('../controllers/authController');


const router = express.Router();


router.use(authController.protect)

router
.route('/')
.get(porteController.getAllPortes)
.post(porteController.createPorte);

router
.route('/:id')
.get(porteController.getPorte)
.patch(porteController.updatePorte)
.delete(porteController.deletePorte);

module.exports = router;