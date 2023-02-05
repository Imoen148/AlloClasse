const Ecole = require('../models/ecoleModel');
const factory = require('./handlerFactory');


exports.getAllEcoles = factory.getAll(Ecole);
exports.createEcole = factory.createOne(Ecole);
exports.getEcole = factory.getOne(Ecole);
exports.updateEcole = factory.updateOne(Ecole);
exports.deleteEcole = factory.deleteOne(Ecole);