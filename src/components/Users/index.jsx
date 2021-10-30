import React, { useState } from 'react'
import './style.scss'
import MainNavigation from '../MainNavigation'
import { searchUsers } from '../../services/Users'
import { addToFriends } from '../../services/Friends'
import getToken from '../../utils/getToken'

export default function Users() {
	const [users, setUsers] = useState([])
	const [timer, setTimer] = useState(null)
	const token = getToken()

	const getUsers = inputValue => {
		return setTimeout(() => {
			searchUsers(inputValue, token)
				.then(res => {
					setUsers(res)
				})
		}, 1000)
	}

	const handleChange = inputValue => {
		clearTimeout(timer)
		setTimer(getUsers(inputValue))
	}

	return (
		<div className="container">
			<MainNavigation />
			<h2>Users</h2>
			<input
				type="text"
				className="search"
				placeholder="Search users"
				onChange={e => handleChange(e.target.value)}
			/>
			<ul className="users">
				{
					users.map(user => (
						<li className="users-item" key={user._id}>
							<span className="users-item__username">{user.username}</span>
							<button
								type="button"
								className="users-item__btn"
								onClick={e => addToFriends(user, token)}
							>
								Add to friends
							</button>
						</li>
					))
				}
			</ul>
		</div>
	)
}