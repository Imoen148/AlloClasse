const express = require('express')
const commentaireController = require('../controllers/commentaireController')
// const authController = require('../controllers/authController');


const router = express.Router();


// router.use(authController.protect)


// NORMAL ROUTES
router
.route('/')
.get( commentaireController.getAllCommentaires)
.post(commentaireController.createCommentaire);

router
.route('/:id')
.get(commentaireController.getCommentaire)
.patch(commentaireController.updateCommentaire)
.delete(commentaireController.deleteCommentaire);

module.exports = router;