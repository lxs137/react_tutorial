var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ['male', 'female']
    },
    role: {
        type: String,
        enum: ['admin', 'user', 'guest'],
        required: true
    },
    phone: String,
    registered: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', UserSchema);