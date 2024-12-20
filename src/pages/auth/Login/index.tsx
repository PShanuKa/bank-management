import { Button,  Row } from 'react-bootstrap'
import {  Navigate, useLocation, useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import AuthLayout from '../AuthLayout'

// components
import { VerticalForm, FormInput, PageBreadcrumb } from '@/components'

import { useMemo } from 'react'
import { useLoginMutation } from '@/features/api/authSlice'
import { toast } from 'material-react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '@/features/reducer/authSlice'

interface UserData {
	email: string
	password: string
}

const BottomLinks = () => {
	return (
		<Row>
			
		</Row>
	)
}

const schemaResolver = yupResolver(
	yup.object().shape({
		email: yup.string().required('Please enter Username'),
		password: yup.string().required('Please enter Password'),
	})
)

const Login = () => {
	const userInfo = useSelector((state: any) => state.auth?.userInfo)
	const navigate = useNavigate()
	const location = useLocation()
	const dispatch = useDispatch()
	const redirectUrl = useMemo(
		() =>
			location.state && location.state.from
				? location.state.from.pathname
				: '/',
		[location.state]
	)

	const [login] = useLoginMutation()

	const loginHandler = async ({ email, password }: UserData) => {
		try {
			const data = await login({ email, password }).unwrap()
			dispatch(setUser(data))
			
			navigate('/')
		} catch (err: any) {
			if (err.status === 404) {
				toast.success('Invalid credentials')
			} else {
				toast.error('something went wrong')
				console.error(err)
			}
		}
	}

	return (
		<>
			<PageBreadcrumb title="Log In" />

			{userInfo && <Navigate to={redirectUrl} replace />}

			<AuthLayout
				authTitle="Sign In"
				helpText="Enter your email address and password to access account."
				bottomLinks={<BottomLinks />}
				hasThirdPartyLogin>
				<VerticalForm<UserData>
					onSubmit={loginHandler}
					resolver={schemaResolver}
					defaultValues={{ email: '', password: '' }}>
					<FormInput
						label="Email address"
						type="text"
						name="email"
						placeholder="Enter your email"
						containerClass="mb-3"
						required
					/>
					<FormInput
						label="Password"
						name="password"
						type="password"
						required
						id="password"
						placeholder="Enter your password"
						containerClass="mb-3">
						
					</FormInput>
					
					<div className="mb-0 text-start">
						<Button
							variant="soft-primary"
							className="w-100"
							type="submit"
						>
							<i className="ri-login-circle-fill me-1" />{' '}
							<span className="fw-bold">Log In</span>{' '}
						</Button>
					</div>
				</VerticalForm>
			</AuthLayout>
		</>
	)
}

export default Login
