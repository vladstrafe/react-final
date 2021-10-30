import axios from 'axios'

function fetchShows() {
	return axios.get('https://api.tvmaze.com/shows')
}

export {
	fetchShows
}