const mongoose = require('mongoose');

const porteSchema = new mongoose.Schema({
    Immeuble:{ // Parent referencing
        type: mongoose.Schema.ObjectId,
        ref: 'Immeuble',
        requires: [true, 'Une porte doit appartenir a un immeuble']
    },
    NumApp:{ 
        type:String,
        trim: true,
    },
    Type:{
        type:String,
        trim:true,
        maxLenght:300
    }, 
    Revenu:{
        type:Number,
        default:0
    }, 
    Vacance :{ 
        type:Boolean,
        default:true
    }
},
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

// POPULATE IMMEUBLE
// porteSchema.pre(/^find/, function(next) {
//     this.populate({
//         path:'Immeuble',
//         select: 'Adresse'
//     })
//     next();
// });

porteSchema.virtual('Locataire', {
    ref: 'Locataire',
    foreignField: 'Porte',
    localField: '_id'
});

const Porte = mongoose.model('Porte', porteSchema);

module.exports = Porte;