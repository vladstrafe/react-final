import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useHistory } from 'react-router-dom'
import { logIn } from '../../../services/Auth'

export default function LoginForm() {
	const history = useHistory()
	const initialValues = {
		email: '',
		password: ''
	}

	const validationSchema = Yup.object({
		email: Yup.string()
			.email('Invalid email')
			.required('Required'),
		password: Yup.string()
			.required('Required')
	})
	
	return (
		<Formik
			initialValues = { initialValues }
			validationSchema = { validationSchema }
			onSubmit = {values => {
					logIn(values)
						.then(res => {
								if (res.data.successful) {
									document.cookie = `token=${res.data.jwt_token}`
									history.push('/library')
								}
								else console.log('something wrong') 
							}
						)
				}	
			}
		>
			{formik => {
				return (
					<Form className="auth-form">
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
							Log In
						</button>
					</Form>
				)
			}}
		</Formik>
	)
}