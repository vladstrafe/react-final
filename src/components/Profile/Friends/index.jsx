import { removeFriend } from "../../../services/Friends";

export default function Friends(props) {
	const { currentUser, token } = props;

	return (
		<li className="friends">
			<ul className="friends-list">
				<h3 className="friends-list__header">Friends</h3>
				{
					currentUser ?
					currentUser.friends.map(friend => 
						<li className="friends-item" key={friend.id}>
							<span className="friends-item__username">{friend.username}</span>
							<button
								className="friends-item__btn"
								onClick={e => removeFriend(friend, token)}
							>
								Remove
							</button>
						</li>	
					)
					: null
				}
			</ul>
		</li>
	)
}

