import { acceptReq, dislineReq } from '../../../services/Friends'

export default function Friendfriends(props) {
	const { currentUser, token } = props;

	return (
		<li className="requests">
			<ul className="requests-list">
				<h3 className="requests-list__header">Friend requests</h3>
				{
					currentUser ?
					currentUser.friendRequests.map(user => 
						<li className="requests-item" key={user.id}>
							<span className="requests-item__username">{user.username}</span>
							<button
								className="requests-item__btn"
								onClick={e => acceptReq(user, token)}
							>
								Accept
							</button>
							<button
								className="requests-item__btn"
								onClick={e => dislineReq(user, token)}
							>
								Disline
							</button>
						</li>	
					)
					: null
				}
			</ul>
		</li>
	)
}