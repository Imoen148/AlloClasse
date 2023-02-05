const mongoose = require('mongoose');

const professeurSchema = new mongoose.Schema({
    
    Nom:{
        type:String,
        required: [true, 'Un professeur doit avoir un nom'],
        unique: true,
        trim:true,
        maxLenght:200
    },
    Prenom:{
        type:String,
        required: [true, 'Un professeur doit avoir un prénom'],
        unique: true,
        trim:true,
        maxLenght:200
    },
    Courriel:{
        type:String,
        required: [true, 'Un professeur doit avoir un courriel'],
        unique: true,
        trim:true,
        maxLenght:150
    },
    Groupe:{
        type:String,
        required: [true, 'Un professeur doit avoir un groupe'],
        trim:true,
        maxLenght:50
    },
    Annee:{
        type:String,
        required: [true, 'Un professeur doit avoir une annee (maternelle, 1ère année, 2ème année, etc.'],
        trim:true,
        maxLenght:50
    },
//     Ecole: { // Child referencing
//         type: mongoose.Schema.ObjectId,
//         ref: 'Ecole',
//         requires: [true, 'Un professeur doit faire parti d\'une école']
//     }
},
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// // POPULATE USER - CHILD REFERENCING
// professeurSchema.pre(/^find/, function(next) {
//     this.populate({
//         path:'Ecole',
//         select: 'Nom'
//     })
//     next();
// });


const Professeur = mongoose.model('Professeurs', professeurSchema);

module.exports = Professeur;