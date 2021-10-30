import axios from 'axios'

function addToFriends(user, token) {
	axios({
		method: 'patch',
		url: 'http://localhost:5000/users/add-friend',
		headers: {'authorization': `Bearer ${token}`},
		data: user
	})
}

function acceptReq(user, token) {
	axios({
		method: 'patch',
		url: 'http://localhost:5000/users/accept',
		headers: {'authorization': `Bearer ${token}`},
		data: user
	})
}

function dislineReq(user, token) {
	axios({
		method: 'patch',
		url: 'http://localhost:5000/users/disline',
		headers: {'authorization': `Bearer ${token}`},
		data: user
	})
}

function removeFriend(friend, token) {
	axios({
		method: 'patch',
		url: 'http://localhost:5000/users/remove-friend',
		headers: {'authorization': `Bearer ${token}`},
		data: friend
	})
}

export {
	addToFriends,
	acceptReq,
	dislineReq,
	removeFriend
}