const mongoose = require('mongoose')

const Game = mongoose.model('Game', {
	name: {
		type: String,
		required: true
	},
	price: {
		type: String,
		required: true
	},
	description: {
		type: String,
	}
})

module.exports = { Game }