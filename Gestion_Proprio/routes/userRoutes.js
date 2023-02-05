const express = require('express');
const userController = require('../controllers/userController')
const authController = require('../controllers/authController')


const router = express.Router();


// LOGIN AND SIGN UP
router.post('/signup', authController.signup);
router.post('/login', authController.login);

// PASSWORD
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);


// FOR CONNECTED USER
router.use(authController.protect);

router.get('/getMe', userController.getMe, userController.getUser);
router.patch('/updateMe', userController.updateMe);
router.delete('/deleteMe', userController.deleteMe);
router.patch('/updateMyPassword', authController.updatePassword);

// -------------- FOR ADMIN ONLY -----------------------

router.use(authController.restrictTo('admin', 'proprietaire'));

router
.route('/')
.get(userController.getAllUsers)
.post(userController.createUser);

router
.route('/:id')
.get(userController.getUser)
.patch(userController.updateUser)
.delete(userController.deleteUser);

module.exports = router;
