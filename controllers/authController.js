const express = require('express');
const router = express.Router();

const {
    registration,
    logIn
} = require('../services/authService');

router.post('/register', async (req, res) => {
    try {
        const {
            username,
            email,
            password
        } = req.body;

        if (!username || !email || !password) throw '!user !password'

        const result = await registration({username, email, password});

        res.json(result);
    } catch (err) {
        res.status(400).json({message: err})    
    }
});

router.post('/login', async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body;

        if (!email || !password) throw '!email or !password'

        const jwt_token = await logIn({email, password});
        res.json({
            successful: true,
            jwt_token
        });
    } catch (err) {
        if (err === '!email or !password') res.json(err)
        else {
            res.status(400).json(err)
        }
    }
});

module.exports = {
    authRouter: router
}