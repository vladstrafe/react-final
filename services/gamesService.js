const { Game } = require('../models/gameModel');

const fetchGames = async () => {
    const games = await Game.find({});
    return games
}

module.exports = {
    fetchGames
};