import axios from 'axios'

function getCurrentUser(token) {
	return axios({
		method: 'get',
		url: 'http://localhost:5000/users/profile',
		headers: {'authorization': `Bearer ${token}`},
	}).then(res => res.data)
}

function searchUsers(inputValue, token) {
	return axios({
		method: 'post',
		url: 'http://localhost:5000/users',
		headers: {'authorization': `Bearer ${token}`},
		data: { inputValue }
	}).then(res => res.data.users)
}

export {
	getCurrentUser,
	searchUsers,
}