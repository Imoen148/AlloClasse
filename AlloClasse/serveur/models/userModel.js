const crypto = require('crypto') // built-in - no need import
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { Console } = require('console');

const userSchema = new mongoose.Schema({
    Nom: {
        type:String,
        required: [true, 'Un utilisateur doit avoir un nom!']
    },
    Prenom: {
        type:String,
        required: [true, 'Un utilisateur doit avoir un prenom!']
    },
    Courriel: {
        type: String,
        required: [true, 'Un utilisateur doit avoir un courriel!'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Entrez une adresse courriel valide']
    },
    Role: {
        type:String,
        enum: ['admin', 'professeur', 'eleve', 'directeur'],
        default: 'eleve'
    },
    Groupe: {
        type:String,
    },
    Photo:  {
        type: String
    },
    password:{
        type: String,
        required: [true,'Entrer un mot de passe'],
        minlength: 8,
        select: false
    },
    passwordConfirm:{
        type: String,
        required:[true, 'Confirme votre mot de passe'],
        validate: {
            // ONLY WORKS ON CREATE AND SAVE!!!
            validator: function(el) {
                return el === this.password;
            },
            message: 'La confirmation de vos mots de passe n\'est pas identique'
        }
    },
    passwordResetToken:String,
    passwordResetExpires: Date,
    passwordChangedAt: {
        type:Date,
        required: [true, 'date']
    },
    active:{
        type:Boolean,
        default:true,
        select: false
    },
    online: {
        type:Boolean,
        default:false
    }
})

// ------------- MIDLEWARES THAT IS ACTIVATED RIGHT BEFORE QUERY (Ex: pre 'save') --------------
userSchema.pre('save', async function(next) {
    // only run the middleware if the password is save
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12);

    this.passwordConfirm = undefined;
    next();
});


userSchema.pre('save', function(next) {
    if (!this.isModified('password') || this.isNew) return next();

    this.passwordChangedAt = Date.now() - 1000;
    next();
});


userSchema.pre(/^find/, function(next) { // /^find/ means any query with the word find (regEx)
    // only find users that are active (active not equals to false)
    this.find({ active: {$ne: false} });
    next();
});

// --------------------------------------------------------------------------------------

// -------------  instance methods available everywhere, no need to export --------------
userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {

    console.log(await bcrypt.hash(candidatePassword, 12));

    
    return await bcrypt.compare(candidatePassword, userPassword)
}

userSchema.methods.changePasswordAfter = function(JWTTimestamp) {
    
    if(this.passwordChangedAt) {
        const changedTimeStamp = parseInt(
            this.passwordChangedAt.getTime() / 1000, 
            10
        );
        return JWTTimestamp < changedTimeStamp;
    }
    // false means NOT changed
    return false;
}

userSchema.methods.createPasswordResetToken = function() {
    const resetToken = crypto.randomBytes(32).toString('hex');

    this.passwordResetToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

        console.log({resetToken}, this.passwordResetToken); 

    this.passwordResetExpires = Date.now() + 10 * 60 * 1000 // 10 minutes

    return resetToken;
}

// --------------------------------------------------------------------------------------

const User = mongoose.model('User', userSchema);

module.exports = User;