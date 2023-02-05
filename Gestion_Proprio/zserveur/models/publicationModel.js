const mongoose = require('mongoose');

const publicationSchema = new mongoose.Schema({
    
    Type:{
        type: String,
        required:true,
        enum : {
            values: ['Devoir', 'Message', 'Autres'],
            message: "Vous devez entrer un des choix suivant : 'Devoir', 'Message' ou 'Autre'"
        },
        trim:true,
    },
    Date: Date,
    Message:{
        type:String,
        required: [true, 'Une publication doit contenir au minimum une lettre'],
        trim:true,
        maxLenght:300
    },
    Photo:{
        type:String,
        trim:true,
    },
    // Professeur:{
    //     //Child referencing
    //     type: mongoose.Schema.ObjectId,
    //     ref: 'Professeur',
    //     requires: [true, 'Une publication doit appartenir au mur d\'un professeur']
    // },
},
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// // POPULATE USER - CHILD REFERENCING
// publicationSchema.pre(/^find/, function(next) {
//     this.populate({
//         path:'Professeur',
//         select: 'Nom'
//     })
//     next();
// });


const Publication = mongoose.model('Publications', publicationSchema);

module.exports = Publication;