var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;
var SALT_WORK_FACTOR = 10;

var UserSchema = new Schema({
    
    FirstName: {
        type:  String,
        required: true
    },
    LastName: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    Username: {
        type: String,
        required: true,
        unique: true
    },
    Password: {
        type: String,
        required: true
    },
    Auditory: {
        createdAt: {
            type: Date, 
            default: Date.now()
        }
    }

});


UserSchema.pre('save', function(next) {
    var user = this;

    if (!user.isModified('Password')) return next();

    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        bcrypt.hash(user.Password, salt, function(err, hash) {
            if (err) return next(err);

            user.Password = hash;
            next();
        });
    });
});


UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.Password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};


UserSchema.methods.addUser = function(cb) {
    this.save(err => {
        if (err) return cb(err);
        var created = true;
        cb(null, created);

    });

};


module.exports = mongoose.model('User', UserSchema);
