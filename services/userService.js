const { User } = require('../models/userModel');

const getUser = async (_id) => {
	const user = await User.findOne({_id})

	if (!user) throw new Error('No users found');
	
	return user
}

const findUsers = async (username) => {
	const users = await User.find({ username: {$regex: `${username}`, $options: 'i'} })

	if (!users) throw new Error('No users found');
	
	return users
}

const patchUser = async (id, changes) => {
	await User.findOneAndUpdate({_id: id}, {$set: changes})
}

module.exports = {
	getUser,
	findUsers,
	patchUser
}