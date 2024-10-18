import { Col, Row } from 'react-bootstrap'
import Statistics from './Statistics'
import Projects from './Projects'
import { PageBreadcrumb } from '@/components'

import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useGetAllUserTaskQuery } from '@/features/api/userTaskSlice'

const Dashboard = () => {
	const userId = useSelector((state: any) => state.auth.userInfo)
	const [statusFilter, setStatusFilter] = useState('')
	const [page] = useState(1)
	const limit = 10000
	const { data } = useGetAllUserTaskQuery({ search: statusFilter, page, limit })

	const [last30DaysIncome, setLast30DaysIncome] = useState(0)

	const [last7DaysIncome, setLast7DaysIncome] = useState(0)

	useEffect(() => {
		if(!userId.isAdmin){
			setStatusFilter(userId._id)
		}
	},[userId])
		


	useEffect(() => {
		const currentDate = new Date()
		const past30DaysDate = new Date()
		past30DaysDate.setDate(currentDate.getDate() - 30)

		const last30DaysTasks = (data?.userTask || []).filter((task: any) => {
			const taskDate = new Date(task.date)
			return (
				taskDate >= past30DaysDate &&
				taskDate <= currentDate &&
				task.status === 'completed'
			)
		})

		const totalIncome = last30DaysTasks.reduce((sum: number, task: any) => {
			return sum + parseInt(task.amount, 10)
		}, 0)

		setLast30DaysIncome(totalIncome)
	}, [data])

	useEffect(() => {
		const currentDate = new Date()
		const past30DaysDate = new Date()
		past30DaysDate.setDate(currentDate.getDate() - 7)

		const last30DaysTasks = (data?.userTask || []).filter((task: any) => {
			const taskDate = new Date(task.date)
			return (
				taskDate >= past30DaysDate &&
				taskDate <= currentDate &&
				task.status === 'completed'
			)
		})

		const totalIncome = last30DaysTasks.reduce((sum: number, task: any) => {
			return sum + parseInt(task.amount, 10)
		}, 0)

		setLast7DaysIncome(totalIncome)
	}, [data])

	

	return (
		<>
			<PageBreadcrumb title="Welcome!" subName="Dashboards" />
			<Row>
				{/* {(statistics || []).map((item, idx) => {
					return (
						<Col xxl={3} sm={6} key={idx}>
							<Statistics
								title={item.title}
								stats={item.stats}
								change={item.change}
								icon={item.icon}
								variant={item.variant}
							/>
						</Col>
					)
				})} */}
				<Col xxl={3} sm={6} >
					<Statistics
						title="Last 7 Days Collected"
						stats={String(last7DaysIncome)}
						change=''
						variant='text-bg-pink'
						icon='ri-eye-line'
						
					/>
				</Col>
				<Col xxl={3} sm={6} >
					<Statistics
						title="Last 30 Days Collected"
						stats={String(last30DaysIncome)}
						change=''
						variant='text-bg-success'
						icon='ri-wallet-2-line'
						
					/>
				</Col>
			</Row>
			<Row>
				<Col xl={12}>
					<Projects />
				</Col>
			</Row>
		</>
	)
}

export default Dashboard
