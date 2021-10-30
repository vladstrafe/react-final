import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useHistory } from 'react-router-dom'
import { regUser } from '../../../services/Auth'

export default function RegistrationForm() {
	const initialValues = {
		username: '',
		email: '',
		password: ''
	}

	const validationSchema = Yup.object({
		username: Yup.string()
			.required('Required')
			.max(15),
		email: Yup.string()
			.email('Invalid email')
			.required('Required'),
		password: Yup.string()
			.required('Required')
			.min(6)
	})

	const history = useHistory()
	
	return (
		<Formik
			initialValues = { initialValues }
			validationSchema = { validationSchema }
			onSubmit = { values => {
					regUser(values)
						.then(res => {
							if (res.data.successful) history.push('/login')
							else alert(res.data.message)
						})
				}
			}
		>
			{formik => {
				return (
					<Form className="auth-form">
						<label htmlFor="username">Username:</label>
						<Field
							type="text"
							name="username"
							id="username"
							className="auth-form__username"
							placeholder="Username"
						/>
						<div className="auth-form__error">
							<ErrorMessage name="username">
								{msg => msg}
							</ErrorMessage>
						</div>

						<label htmlFor="email">Email:</label>
						<Field
							type="email"
							name="email"
							id="email"
							className="auth-form__email"
							placeholder="Email"
						/>
						<div className="auth-form__error">
							<ErrorMessage name="email">
								{msg => msg}
							</ErrorMessage>
						</div>
						<label htmlFor="password">Password:</label>
						<Field
							type="password"
							name="password"
							id="password"
							className="auth-form__password"
							placeholder="Password"
						/>
						<div className="auth-form__error">
							<ErrorMessage name="password">
								{msg => msg}
							</ErrorMessage>
						</div>
						<button
							type="submit"
							className="auth-form__btn"
							disabled={!formik.isValid || !formik.dirty}
						>
							Sign Up
						</button>
					</Form>
				)
			}}
		</Formik>
	)
}