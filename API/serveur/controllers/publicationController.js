const Publication = require('../models/publicationModel');
const factory = require('./handlerFactory');


exports.getAllPublications = factory.getAll(Publication);
exports.createPublication = factory.createOne(Publication);
exports.getPublication = factory.getOne(Publication);
exports.updatePublication = factory.updateOne(Publication);
exports.deletePublication = factory.deleteOne(Publication);