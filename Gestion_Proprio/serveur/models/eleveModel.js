const mongoose = require('mongoose');

const eleveSchema = new mongoose.Schema({
    
    Nom:{
        type:String,
        required: [true, 'Un professeur doit avoir un nom'],
        trim:true,
        maxLenght:200
    },
    Prenom:{
        type:String,
        required: [true, 'Un professeur doit avoir un prénom'],
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
    // Ecole: { // Child referencing
    //     type: mongoose.Schema.ObjectId,
    //     ref: 'Ecole',
    //     requires: [true, 'Un élève doit faire parti d\'une école']
    // },
    // Professeur: { // Child referencing
    //     type: mongoose.Schema.ObjectId,
    //     ref: 'Ecole',
    //     requires: [true, 'Un élève doit faire avoir un professeur']
    // }
},
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// eleveSchema.pre(/^find/, function(next) {
//     this.populate({
//         path:'Ecole',
//         select: 'Nom'
//     })
//     next();
// });

// eleveSchema.pre(/^find/, function(next) {
//     this.populate({
//         path:'Professeur',
//         select: 'Nom' // + prénom
//     })
//     next();
// });

const Eleve = mongoose.model('Eleves', eleveSchema);

module.exports = Eleve;