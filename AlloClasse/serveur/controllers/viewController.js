const path = require('path');
const catchAsync = require('./../utils/catachAsync');
const AppError = require('./../utils/appError');

exports.getAccueil = (req, res) => {
    res.status(200).render('index')
}

exports.getPageConnexion = (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'views/connexion.html'))
}

exports.getPageEnregistrement = (req, res) => {
    res.status(200).sendFile(__dirname + '../../client/views/enregistrement.html')
}