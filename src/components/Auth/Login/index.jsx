import '../style.scss'
import { Link } from 'react-router-dom'
import LoginForm from '../LoginForm'


export default function Login() {
	return (
		<div className="container">
			<h2 className="auth-title">Log in</h2>

			<LoginForm />
			
			<p className="auth-proposal">
				Don't have an account? <Link to="/registration">Sign up</Link>
			</p>
		</div>
	)
}