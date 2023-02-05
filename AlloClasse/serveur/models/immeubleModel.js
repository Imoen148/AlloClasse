// const mongoose = require('mongoose');

// const immeubleSchema = new mongoose.Schema({
//     User: { // Parent referencing
//         type: mongoose.Schema.ObjectId,
//         ref: 'User',
//         requires: [true, 'Un immeuble doit appartenir a un user']
//     },
//     // Location: {
//     //     //GeoJson
//     //     type:{
//     //         type:String,
//     //         default:'Point',
//     //         enum: ['Point']
//     //     },
//     //     coordinates: [Number]
//     // },
//     Adresse: {
//         type:Object,
//         required: [true, 'Un immeuble doit avoir une adresse'],
//         unique: true,
//         NumPorte: String,
//         Rue: String, 
//         Ville: String, 
//         CP: String, 
//         Province: String
//     },
//     Style_Batiment:{ 
//         type:String,
//         trim: true,
//         enum: {
//             values: ['Jumelé', 'Détaché'],
//             message: "Vous devez entrer 'Jumelé' ou 'Détaché'"
//         }
//     },
//     Superficie_batiment:{
//         type:Number
//     },
//     Superficie_Terrain:{
//         type:Number
//     },
//     Date_Construction:{
//         type:Number
//     },
//     Taxes_Municipale:{
//         type:Number,
//         default:0
//     },
//     Taxes_Scolaires:{
//         type:Number,
//         default:0
//     },
//     Nb_Portes:{
//         type:Number,
//         required: [true, 'Un immeuble doit avoir un nombre de porte']
//         // pour cacher certaine propriété (comme password), ajouter 
//         // select: false
//     }
// },
// {
//     toJSON: { virtuals: true },
//     toObject: { virtuals: true }
// })

// immeubleSchema.index({Nb_Portes: 1});


// // POPULATE USER - CHILD REFERENCING
// immeubleSchema.pre(/^find/, function(next) {
//     this.populate({
//         path:'User',
//         select: 'name'
//     })
//     next();
// });



// // VIRTUAL POPULATE - PARENT REFERENCING
// immeubleSchema.virtual('BonDeReparations', {
//     ref: 'BonDeReparation',
//     foreignField: 'Immeuble',
//     localField: '_id'
// });

// immeubleSchema.virtual('Fournisseurs', {
//     ref: 'Fournisseur',
//     foreignField: 'Immeuble',
//     localField: '_id'
// });

// immeubleSchema.virtual('Portes', {
//     ref: 'Porte',
//     foreignField: 'Immeuble',
//     localField: '_id'
// });

// // CAN USE .populate('fournisseur') apres les query dans controlleur


// // immeubleSchema.virtual('Revenu_totaux').get(function() { 
// //     let revenuTotal = 0;
// //     this.Portes.forEach(porte => { 
// //         revenuTotal += porte.Revenu;
// //     });
// //     return revenuTotal * 12;
// // });

// const Immeuble = mongoose.model('Immeuble', immeubleSchema);

// module.exports = Immeuble;