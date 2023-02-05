const Eleve = require('../models/eleveModel');
const factory = require('./handlerFactory');


exports.getAllEleves = factory.getAll(Eleve);
exports.createEleve = factory.createOne(Eleve);
exports.getEleve = factory.getOne(Eleve);
exports.updateEleve = factory.updateOne(Eleve);
exports.deleteEleve = factory.deleteOne(Eleve);