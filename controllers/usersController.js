const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken');

const {
	getUser,
	findUsers,
	patchUser
} = require('../services/userService')

router.post('/', async (req, res) => {
	try {
		const { authorization } = req.headers;
		const { inputValue } = req.body;

		if (!authorization) throw 401

		const users = await findUsers(inputValue)

		res.json({ users })
	} catch(err) {
		if (err === 401) res.status(401).json('please sign in')
		else res.status(500).json(err.message)
	}
})

router.get('/profile', async (req, res) => {
	try {
		const { authorization } = req.headers;

		if (!authorization) throw 401

		const [, token] = authorization.split(' ');
		const tokenPayload = jwt.verify(token, 'secret');
		const user = await getUser(tokenPayload._id)

		res.json(user)
	} catch(err) {
		if (err === 401) res.status(401).json('please sign in')
		else res.status(500).json(err.message)
	}
})

router.patch('/add-friend', async (req, res) => {
	try {
		const { authorization } = req.headers;

		if (!authorization) throw 401

		const target = req.body
		const [, token] = authorization.split(' ');
		const tokenPayload = jwt.verify(token, 'secret');
		const user = await getUser(tokenPayload._id)

		const newFriendRequests = [
			...target.friendRequests,
			{
				id: user.id,
				username: user.username
			}
		]

		await patchUser(target._id, {
				friendRequests: newFriendRequests
			}
		)
		
		res.json('User updated successfully')
	} catch(err) {
		res.status(401).json(err)
	}
})

router.patch('/accept', async (req, res) => {
	try {
		const { authorization } = req.headers;

		if (!authorization) throw 401

		const [, token] = authorization.split(' ');
		const tokenPayload = jwt.verify(token, 'secret');
		const user = await getUser(tokenPayload._id)
		const newFriend = await getUser(req.body.id)
		let newFriendRequests = []

		for (let request of user.friendRequests) {
			if (request.id !== newFriend.id) {
				newFriendRequests.push(request)
			}
		}

		await patchUser(user.id, {
			friends: [...user.friends, {
				id: newFriend.id,
				username: newFriend.username
			}],
			friendRequests: newFriendRequests
		})
		
		await patchUser(newFriend._id, {
			friends: [
				...newFriend.friends,
				{
					id: user.id,
					username: user.username
				}
			]
		})

		const updatedUser = await getUser(tokenPayload._id)
		res.json({
			message: 'User updated successfully',
			user: updatedUser
		})
	} catch(err) {
		res.status(401).json(err)
	}
})

router.patch('/disline', async (req, res) => {
	try {
		const { authorization } = req.headers;

		if (!authorization) throw 401

		const [, token] = authorization.split(' ');
		const tokenPayload = jwt.verify(token, 'secret');
		const user = await getUser(tokenPayload._id)
		const dislinedUser = await getUser(req.body.id)
		let newFriendRequests = []

		for (let request of user.friendRequests) {
			if (request.id !== dislinedUser.id) {
				newFriendRequests.push(request)
			}
		}

		await patchUser(user.id, {
			friendRequests: newFriendRequests
		})
		
		const updatedUser = await getUser(tokenPayload._id)
		res.json(updatedUser)
	} catch(err) {
		res.status(401).json(err)
	}
})

router.patch('/remove-friend', async (req, res) => {
	try {
		const { authorization } = req.headers;
		if (!authorization) throw 401

		const [, token] = authorization.split(' ');
		const tokenPayload = jwt.verify(token, 'secret');
		const user = await getUser(tokenPayload._id)
		const target = await getUser(req.body.id)
		let newFriendList = []
		let targetNewFriendList = []

		for (let friend of user.friends) {
			if (friend.id !== target.id) newFriendList.push(friend)
		}

		for (let friend of target.friends) {
			if (friend.id !== user.id) targetNewFriendList.push(friend)
		}

		await patchUser(user.id, {friends: newFriendList})
		await patchUser(target.id, {friends: targetNewFriendList})
		res.json('Friend removed')
	} catch(err) {
		res.status(401).json(err)
	}
})

module.exports = {
	userRouter: router
}