import React, { useState, useEffect } from 'react'
import './style.scss'
import MainNavigation from '../MainNavigation'
import { fetchShows } from '../../services/Shows'
import Shows from '../Shows'
import Pagination from './Pagination'

export default function Library() {
	const [shows, setShows] = useState([])
	const [currentPage, setCurrentPage] = useState(1)
	const showsPerPage = 12
	
	useEffect(() => {
		fetchShows()
			.then(res => setShows(res.data))
	}, [])

	const indexOfLastShow = currentPage * showsPerPage
	const indexOfFirstShow = indexOfLastShow - showsPerPage
	const currentShows = shows.slice(indexOfFirstShow, indexOfLastShow)

	const paginate = pageNumber => setCurrentPage(pageNumber) 

	return (
		<div className="container">
			<MainNavigation />
			<h2>Library</h2>
			<Shows shows={currentShows} />
			<Pagination
				totalShows={shows.length}
				showsPerPage={showsPerPage}
				paginate={paginate}
			/>
		</div>
	)
}