const mongoose = require('mongoose');

const locataireSchema = new mongoose.Schema({
    Nom:{
        type: String,
        required:true,
        trim: true,
    },
    Prenom:{ 
        type:String,
        required:true,
        trim: true,
    },
    Courriel:{
        type:String,
        trim:true,
        required:true,
        maxLenght:300
    }, 
    telPrincipal:{
        type:String,
        trim:true,
        required:true
    }, 
    telAutre:{
        type:String,
        trim:true
    }, 
    imgBail : {

    },
    Date_Debut_Bail: Date,
    Date_Fin_Bail: Date,
    Porte :{ // Parent referencing
        type: mongoose.Schema.ObjectId,
        ref: 'Porte',
        requires: [true, 'Un locataire doit appartenir a une porte']
    }
},
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

// POPULATE IMMEUBLE
// locataireSchema.pre(/^find/, function(next) {
//     this.populate({
//         path:'Immeuble',
//         select: 'Adresse'
//     })
//     next();
// });

const Locataire = mongoose.model('Locataire', locataireSchema);

module.exports = Locataire;