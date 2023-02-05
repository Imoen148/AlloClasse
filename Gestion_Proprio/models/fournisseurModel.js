const mongoose = require('mongoose');

const fournisseurSchema = new mongoose.Schema({
    Type:{
        type: String,
        required:true,
        enum : {
            values: ['Assurance', 'Déneigement', 'Pelouse', 
            'Hypothèque', 'Propane', 'Électricité', 
            'Télécommunication', 'Concierge', 'Autre'],
            message: "Vous devez entrer un des choix suivant : 'Assurance', 'Déneigement', 'Pelouse', 'Hypothèque', 'Propane', 'Électricité', 'Télécommunication', 'Concierge' ou 'Autre'"
        },
    },
    Cie:{ 
        type:String,
        trim: true,
    },
    Description:{
        type:String,
        trim:true,
        maxLenght:300
    }, 
    Mensualité:{
        type:Number,
        default:0
    }, 
    Date_de_renouvellement:Date,
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
fournisseurSchema.pre(/^find/, function(next) {
    this.populate({
        path:'Immeuble',
        select: 'Adresse'
    })
    next();
});

// fournisseurSchema.virtual('Revenu_totaux').get(function() {
//     let revenuTotal = 0;
//     this.Portes.forEach(porte => { 
//         revenuTotal += porte.Revenu;
//     });
//     return revenuTotal * 12;
// });

// fournisseurSchema.virtual('Depenses_totales').get(function() {
//     let depenseTotal = this.Taxes_Municipale + this.Taxes_Scolaires;
//     this.Fournisseurs.forEach(fournisseurs => { 
//         depenseTotal += (fournisseurs.Mensualité * 12);
//     });
//     return depenseTotal;
// });

const Fournisseur = mongoose.model('Fournisseur', fournisseurSchema);

module.exports = Fournisseur;