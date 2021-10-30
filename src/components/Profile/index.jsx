import './style.scss'
import { useState, useEffect } from 'react'
import MainNavigation from '../MainNavigation'
import Friends from './Friends'
import FriendRequests from './FriendRequests'
import getToken from '../../utils/getToken'
import { getCurrentUser } from '../../services/Users'

export default function Profile() {
	const [currentUser, setCurrentUser] = useState()

	useEffect(() => {
		const token = getToken()
		getCurrentUser(token)
			.then(res => {
				setCurrentUser(res)
			})	
	}, [])

	const token = getToken()

	return (
		<div className="container">
			<MainNavigation />
			<h2>Profile</h2>

			<ul style={{width: '350px'}}>
				<Friends currentUser={currentUser} token={token} />
				<FriendRequests currentUser={currentUser} token={token} />
			</ul>
		</div>
	)
}