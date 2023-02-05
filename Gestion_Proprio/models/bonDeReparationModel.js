const mongoose = require('mongoose');

const bonDeReparationSchema = new mongoose.Schema({
    Localisation:String,
    Date_de_demande:Date,
    Type:{
        type: String,
        required:true,
        enum : {
            values: ['Plomberie', 'Électricité', 'Peinture', 
            'Infiltration', 'Extérieur', 'Autre'],
            message: "Vous devez entrer un des choix suivant : 'Plomberie', 'Électricité', 'Peinture', 'Infiltration', 'Extérieur', 'Autre'"
        },
    },
    Description:{
        type:String,
        trim:true,
        maxLenght:300
    },
    Statut: {
        type: String,
        required:true,
        enum : {
            values: ['Nouveau', 'En traitement', 'Complété'],
            message: "Vous devez entrer un des choix suivant : 'Nouveau', 'En traitement' ou 'Complété'"
        },
    },
    Date_de_completion: Date,
    Coût:Number,
    Immeuble :{ // Parent referencing
        type: mongoose.Schema.ObjectId,
        ref: 'Immeuble',
        requires: [true, 'Un fournisseur doit appartenir a un immeuble']
    }
},
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

// POPULATE IMMEUBLE
// bonDeReparationSchema.pre(/^find/, function(next) {
//     this.populate({
//         path:'Immeuble',
//         select: 'Adresse'
//     })
//     next();
// });

const BonDeReparation = mongoose.model('BonDeReparation', bonDeReparationSchema);

module.exports = BonDeReparation;