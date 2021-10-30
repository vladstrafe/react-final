import '../style.scss'
import { Link } from 'react-router-dom'
import RegistrationForm from '../RegistrationForm'

export default function Registration() {
	return (
		<div className="container">
			<h2 className="auth-title">Registration</h2>

			<RegistrationForm />

			<p className="auth-proposal">
				Already have an account? <Link to="/login">Log in</Link>
			</p>
		</div>
	)
}