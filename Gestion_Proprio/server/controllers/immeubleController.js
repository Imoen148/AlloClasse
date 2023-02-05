const Immeuble = require('./../models/immeubleModel')
const catchAsync = require('./../utils/catachAsync')
const factory = require('./handlerFactory');


exports.getAllImmeubles = factory.getAll(Immeuble, "Immeuble");
exports.createImmeuble = factory.createOne(Immeuble);
exports.getImmeuble = factory.getOne(Immeuble, [{ path:'Fournisseurs'}, { path:'BonDeReparations'}, { path: 'Portes'}]);
exports.updateImmeuble = factory.updateOne(Immeuble);
exports.deleteImmeuble = factory.deleteOne(Immeuble);

exports.getStatsPortes = catchAsync(async (req,res, next) => {
    
    const stats = await Immeuble.aggregate([
        {
            $unwind: '$Portes'
        },
        {
            $match: {Nb_Portes : {$gte:1}}
        },
        {
            $group:{
                _id: '$Adresse',
                totalPortes : { $sum : 1},
                totalRevenu : { $sum : '$Portes.Revenu'},
                totalVacance :  { $sum: { $cond: [ { $eq: [ '$Portes.Vacance', true ] }, 1, 0 ] }}},
        }
    ])

    res.status(200).json({
        status: 'success',
        data : stats
    })
    
});

exports.setImmeubleId = (req, res, next) => {
    if(!req.body.immeuble) req.body.Immeuble = req.params.immeubleId;
    next();
}
