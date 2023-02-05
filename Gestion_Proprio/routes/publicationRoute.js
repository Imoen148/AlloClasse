const express = require('express')
const publicationController = require('../controllers/publicationController')
// const authController = require('../controllers/authController');


const router = express.Router();


// router.use(authController.protect)


// NORMAL ROUTES
router
.route('/')
.get( publicationController.getAllPublications)
.post(publicationController.createPublication);

router
.route('/:id')
.get(publicationController.getPublication)
.patch(publicationController.updatePublication)
.delete(publicationController.deletePublication);

module.exports = router;