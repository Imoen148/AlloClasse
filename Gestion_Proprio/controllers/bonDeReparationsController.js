const BonDeReparation = require('../models/bonDeReparationModel');
const factory = require('./handlerFactory');


exports.getAllBonDeReparations = factory.getAll(BonDeReparation);
exports.createBonDeReparation = factory.createOne(BonDeReparation);
exports.getBonDeReparation = factory.getOne(BonDeReparation);
exports.updateBonDeReparation = factory.updateOne(BonDeReparation);
exports.deleteBonDeReparation = factory.deleteOne(BonDeReparation);
