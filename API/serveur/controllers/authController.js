const crypto = require('crypto');
const {promisify} = require('util');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/appError');
const sendEmail = require('../utils/email');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catachAsync');


const signToken = id => {
    // *** the secret should have at least 32 caracters
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
}

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);

    // SECURITY BEST PRACTICES - SEND TOKEN VIA COOKIE 
    const cookieOptions = {
        expires : new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    };

    if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

    user.password = undefined; //hide the password in the response

    res.cookie('jwt', token, cookieOptions);

    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user
        }
    })
}

exports.signup = catchAsync(async (req, res, next) => {
    const newUser = await User.create({
        Nom: req.body.Nom,
        Prenom: req.body.Prenom,
        Courriel: req.body.Courriel,
        Role: req.body.Role,
        Groupe: req.body.Groupe,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
        passwordChangedAt: req.body.passwordChangedAt
    });

    createSendToken(newUser, 201, res);
});


exports.login = catchAsync(async (req,res,next) => {
    const {Courriel, password} = req.body; // même chose que :  const email = req.body.Courriel
  
    // 1) check if email exists and password
    if (!Courriel || !password) {
        return next(new AppError('Veuillez fournir un courriel et un mot de passe!', 400))
    }

    // 2) Check if user exists && password is correct
    const user = await User.findOne({ Courriel }).select('+password');
    
    if (!user || !await user.correctPassword(password, user.password)) {
        return next(new AppError('Courriel ou password invalide!', 401));
    }
    
    // 3) Mettre l'utilisateur online
    await User.findByIdAndUpdate(user.id, {online: true});

    // 4) If ok, sent token to client
    createSendToken(user, 200, res);

});

exports.protect = catchAsync( async (req, res, next)=> {
    // 1) Get the token and check if it exists
    let token;

    if (
        req.headers.authorization && 
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return next(
            new AppError('Vous n\'êtes pas connecté! Connectez-vous pour avoir accès à votre application.', 401)
        );
    }

    // 2) validate the token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // 3) Check if user still exists
    const currentUser = await User.findById(decoded.id);

    if (!currentUser) {
        return next(new AppError('L\'utilisateur appartenant à ce jeton n\'existe plus', 401))
    }

    // 4) Check if user changed password after the token was issued
    if (currentUser.changePasswordAfter(decoded.iat)){
        return next(new AppError('Cet utilisateur a récemment changé de mot de passe! Reconnectez-vous à noueau', 401));
    }

    // GRANT ACCES TO NOW PROTECTED ROUTES
    req.user = currentUser;
    next();
});


exports.isLoggedIn = catchAsync( async (req, res, next)=> {
    // 1) Get the token and check if it exists
    let token;

    if (
        req.headers.authorization && 
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return next(
            new AppError('Vous n\'êtes pas connecté! Connectez-vous pour avoir accès à votre application.', 401)
        );
    }

    // 2) validate the token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // 3) Check if user still exists
    const currentUser = await User.findById(decoded.id);

    if (!currentUser) {
        return next(new AppError('L\'utilisateur appartenant à ce jeton n\'existe plus', 401))
    }

    // 4) Check if user changed password after the token was issued
    if (currentUser.changePasswordAfter(decoded.iat)){
        return next(new AppError('Cet utilisateur a récemment changé de mot de passe! Reconnectez-vous à noueau', 401));
    }

    // GRANT ACCES TO NOW PROTECTED ROUTES
    req.user = currentUser;
    next();
});


exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.Role)) {
            return next(new AppError('Vous n\'avez pas la permission de performer cette action', 403))
        }

        next();
    };
}

exports.forgotPassword = catchAsync(async (req, res, next) => {
    // 1) Get user based on posted email
    const user = await User.findOne({Courriel: req.body.Courriel})
    if (!user){
        return next(new AppError('Il n\'y a pas d\'utilisateur associé à ce courriel', 404))
    }

    // 2) Generate random reset token
    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    // 3) Send it to user's email
    const resetURL = `${req.protocol}://${req.get(
        'host'
        )}/api/v1/users/resetPassword/${resetToken}`

    const message = `Oublié votre mot de passe? Soummetez une nouvelle requête \'PATCH\' avec avec votre nouveau mot de passe ainsi que la confirmation du mot de passe à :
    \n${resetURL}
    \nSi vous n'avez pas oublié votre mot de passe, ignoré ce courriel!`;

    try{
        await sendEmail({
            email: user.Courriel,
            subject: 'Votre jeton de renouvellement (valide pour 10 minutes)',
            message
        });

        res.status(200).json({
            status: 'success',
            message: 'Jeton envoyé par courriel!'
        });
    } catch(err) {
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save({ validateBeforeSave: false})

        return next(
            new AppError('Il y a eu une erreur lors de l\'envoi du jeton. Essayer à nouveau!',
            500)
        );
    };
});

exports.resetPassword = catchAsync(async (req, res, next) => {
    // 1) Get user based on the token
    const hashedToken = crypto
        .createHash('sha256')
        .update(req.params.token)
        .digest('hex');

    const user = await User.findOne({ 
        passwordResetToken: hashedToken, 
        passwordResetExpires: { $gt: Date.now() }
    });


    // 2) If token has not expire, and there is a user, set the new password
    if(!user) next(new AppError('Le jeton est invalide ou expiré', 400))

    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    
    // 3) Update changedPasswordAt property for the user
        // handle by pre save middleware in userModel

    // 4) Log the user in, send JWT
    createSendToken(user, 200, res);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
    // 1) Get user from collection
    const user = await User.findById(req.user.id).select('+password');

    // 2) Check if POSTed current password is correct
    if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
        return next(new AppError('Votre mot de passe est invalid.', 401));
    }

    // 3) If so, update password
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    await user.save();

    // 4) Log user in, send JWT
    createSendToken(user, 200, res);
});
