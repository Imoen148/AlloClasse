const crypto = require('crypto') // built-in - no need import
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type:String,
        required: [true, 'A user need a name!']
    },
    email: {
        type: String,
        required: [true, 'A user need an email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    photo:  {
        type: String
    },
    role: {
        type:String,
        enum: ['admin', 'user', 'gestionnaire', 'locataire', 'proprietaire'],
        default: 'user'
    },
    plan:{
        type:String,
        enum: ['basic', 'popular', 'premium'],
        default: 'basic'
    },
    password:{
        type: String,
        required: [true,'Please provide a password'],
        minlength: 8,
        select: false
    },
    passwordConfirm:{
        type: String,
        required:[true, 'Please confirm your password'],
        validate: {
            // ONLY WORKS ON CREATE AND SAVE!!!
            validator: function(el) {
                return el === this.password;
            },
            message: 'Confirmation password is not the same'
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