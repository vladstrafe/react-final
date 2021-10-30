import './style.scss'
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect
} from 'react-router-dom'

import Registration from '../Auth/Registration'
import Login from '../Auth/Login'
import Library from '../Library'
import Users from '../Users'
import Profile from '../Profile'
import NotFound from '../NotFound'

export default function RouterComponent() {
	return (
		<Router>
			<Switch>
				<Route exact path="/">
					{/* {isLoggedIn ? <Redirect to="/registration" /> : <Redirect to="/library" />} */}
					<Redirect to="/registration" />
				</Route>
				<Route path="/registration" component={Registration} />
				<Route path="/login" component={Login} />
				<Route path="/library" component={Library} />
				<Route path="/users" component={Users} />
				<Route path="/profile" component={Profile} />
				<Route path="*" component={NotFound} />
			</Switch>
		</Router>
	)
}