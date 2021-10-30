const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const { fetchGames } = require('../services/gamesService');

    try {
        const games = await fetchGames();

        if (!games) throw 'games not found'
    
        res.json(games);    
    } catch(err) {
        res.status(200).json(err)
    }
});

module.exports = {
    gamesRouter: router
}