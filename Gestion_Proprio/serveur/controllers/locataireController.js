const Locataire = require('./../models/locataireModel');
const factory = require('./handlerFactory');


exports.getAllLocataires = factory.getAll(Locataire);
exports.createLocataire = factory.createOne(Locataire);
exports.getLocataire = factory.getOne(Locataire);
exports.updateLocataire = factory.updateOne(Locataire);
exports.deleteLocataire = factory.deleteOne(Locataire);