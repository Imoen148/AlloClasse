const Porte = require('./../models/porteModel')
const factory = require('./handlerFactory');


exports.getAllPortes = factory.getAll(Porte, { path:'Locataire'});
exports.createPorte = factory.createOne(Porte);
exports.getPorte = factory.getOne(Porte, { path:'Locataire'});
exports.updatePorte = factory.updateOne(Porte);
exports.deletePorte = factory.deleteOne(Porte);