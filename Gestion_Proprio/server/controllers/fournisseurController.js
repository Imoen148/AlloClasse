const Fournisseur = require('./../models/fournisseurModel')
const factory = require('./handlerFactory');


exports.getAllFournisseurs = factory.getAll(Fournisseur);
exports.createFournisseur = factory.createOne(Fournisseur);
exports.getFournisseur = factory.getOne(Fournisseur);
exports.updateFournisseur = factory.updateOne(Fournisseur);
exports.deleteFournisseur = factory.deleteOne(Fournisseur);

// exports.getStatsPortes = catchAsync(async (req,res, next) => {
    
//     const stats = await Fournisseur.aggregate([
//         {
//             $unwind: '$Portes'
//         },
//         {
//             $match: {Nb_Portes : {$gte:1}}
//         },
//         {
//             $group:{
//                 _id: '$Adresse',
//                 totalPortes : { $sum : 1},
//                 totalRevenu : { $sum : '$Portes.Revenu'},
//                 totalVacance :  { $sum: { $cond: [ { $eq: [ '$Portes.Vacance', true ] }, 1, 0 ] }}},
//         }
//     ])

//     res.status(200).json({
//         status: 'success',
//         data : stats
//     })
    
// });