import { authApi } from '@/common/api'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function useRegister() {
	const [loading, setLoading] = useState(false)

	const navigate = useNavigate()

	const  isAuthenticated = false

	const register = async ({
		name,
		email,
		password1,
	}: {
		name: string
		email: string
		password1: string
	}) => {
		setLoading(true)
		try {
			const { data } = await authApi.register({
				name,
				email,
				password: password1,
			})
			if (data?.id) {
				navigate('/account/login')
			}
		} finally {
			setLoading(false)
		}
	}

	return { loading, register, isAuthenticated }
}
