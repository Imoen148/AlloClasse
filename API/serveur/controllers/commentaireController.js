const Commentaire = require('../models/commentaireModel');
const factory = require('./handlerFactory');


exports.getAllCommentaires = factory.getAll(Commentaire);
exports.createCommentaire = factory.createOne(Commentaire);
exports.getCommentaire = factory.getOne(Commentaire);
exports.updateCommentaire = factory.updateOne(Commentaire);
exports.deleteCommentaire = factory.deleteOne(Commentaire);