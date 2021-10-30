import './style.scss'
import { Link } from 'react-router-dom'

export default function MainNavigation() {
	return (
		<nav className="nav-wrap">
			<ul className="nav">
				<li className="nav-item">
					<Link to="/library" className="nav-item__link">Library</Link>
				</li>
				<li className="nav-item">
					<Link to="/users" className="nav-item__link">Users</Link>
				</li>
				<li className="nav-item">
					<Link to="/profile" className="nav-item__link">Profile</Link>
				</li>
			</ul>
		</nav>
	)
}
