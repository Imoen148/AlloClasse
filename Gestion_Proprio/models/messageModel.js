const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    
    Date: Date,
    Message:{
        type:String,
        required: [true, 'Une publication doit contenir au minimum une lettre'],
        trim:true,
        maxLenght:300
    },
    // Expediteur:{
    //     //Child referencing
    //     type: mongoose.Schema.ObjectId,
    //     ref: 'Professeur',
    // },
    // Destinataire:{
    //     //Child referencing
    //     type: mongoose.Schema.ObjectId,
    //     ref: 'Professeur',
    // }
    // Expediteur:{
    //     //Child referencing
    //     type: mongoose.Schema.ObjectId,
    //     ref: 'Eleve',
    // },
    // Destinataire:{
    //     //Child referencing
    //     type: mongoose.Schema.ObjectId,
    //     ref: 'Eleve',
    // }
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


const Message = mongoose.model('Messages', messageSchema);

module.exports = Message;