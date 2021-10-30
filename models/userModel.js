const mongoose = require('mongoose');

const User = mongoose.model('User', {
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    friends: {
        type: Array,
        default: []
    },
    friendRequests: {
        type: Array,
        default: []
    },
    favorites: {
        type: Array,
        default: []
    },
    liked: {
        type: Array,
        default: []
    },
    created_date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = { User };
