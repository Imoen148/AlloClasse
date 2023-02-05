const mongoose = require('mongoose');

const ecoleSchema = new mongoose.Schema({
    
    Nom:{
        type:String,
        required: [true, 'Une école doit avoir un nom'],
        unique: true,
        trim:true,
        maxLenght:200
    },
    Validation_Courriel:{
        type:String,
        required: [true, 'Une école doit avoir un nom de domaine de courriel'],
        unique: true,
        trim:true,
        maxLenght:150
    },
    Adresse:{
        type:Object,
        required: [true, 'Une école doit avoir une adresse'],
        unique: true,
        Num_Porte: String,
        Rue: String, 
        Ville: String, 
        Province: String,
        Code_Postal: String 
    },
    Region:{
        type:String,
        required: [true, 'Une école doit avoir une région admnistrative'],
        trim:true,
        maxLenght:200
    }
},
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

const Ecole = mongoose.model('Ecoles', ecoleSchema);

module.exports = Ecole;