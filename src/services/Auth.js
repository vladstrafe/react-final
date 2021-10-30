import axios from "axios";

function regUser(data) {
	return axios.post('http://localhost:5000/auth/register', data)
}

function logIn(data) {
	return axios.post('http://localhost:5000/auth/login', data)
}

export {
	regUser,
	logIn
}