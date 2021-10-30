const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { User } = require('../models/userModel');

const registration = async ({username, email, password}) => {
    console.log(username, email, password);

    const isUserExists = await User.find({email: email}).count() > 0

    if (isUserExists) return {
        successful: false,
        message: 'User with this email already exists'
    }

    const user = new User({
        username,
        email,
        password: await bcrypt.hash(password, 10)
    });
    
    await user.save();
    return {
        successful: true,
        message: 'Profile created successfully'
    }
}

const logIn = async ({email, password}) => {
    const user = await User.findOne({email});

    if (!user) {
        throw new Error('login error !user');
    }

    if (!(await bcrypt.compare(password, user.password))) {
        throw new Error('login error, invalid password compare');
    }

    const token = jwt.sign({
        _id: user._id,
    }, 'secret');
    return token;
}

module.exports = {
    registration,
    logIn
};