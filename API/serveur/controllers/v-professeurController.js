const Professeur = require('../models/professeurModel');
const factory = require('./handlerFactory');


exports.getAllProfesseurs = factory.getAll(Professeur);
exports.createProfesseur = factory.createOne(Professeur);
exports.getProfesseur = factory.getOne(Professeur);
exports.updateProfesseur = factory.updateOne(Professeur);
exports.deleteProfesseur = factory.deleteOne(Professeur);