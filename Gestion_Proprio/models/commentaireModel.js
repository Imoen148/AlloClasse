const mongoose = require('mongoose');

const commentaireSchema = new mongoose.Schema({
    
    Date: Date,
    Message:{
        type:String,
        required: [true, 'Un commentaire doit contenir au minimum une lettre'],
        trim:true,
        maxLenght:300
    },
    // Publication:{
    //     //Child referencing
    //     type: mongoose.Schema.ObjectId,
    //     ref: 'Professeur',
    //     requires: [true, 'Un commentaire doit appartenir à une publication']
    // },
},
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// // POPULATE USER - CHILD REFERENCING
// commentaireSchema.pre(/^find/, function(next) {
//     this.populate({
//         path:'Publication',
//         select: 'Object_ID'
//     })
//     next();
// });


const Commentaire = mongoose.model('Commentaires', commentaireSchema);

module.exports = Commentaire;