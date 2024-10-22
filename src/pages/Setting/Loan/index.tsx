import { FormInput, PageBreadcrumb } from '@/components'
import {
	useGetSettingQuery,
	useUpdateSettingMutation,
} from '@/features/api/settingSlice'
import { toast } from 'material-react-toastify'
import { useEffect, useState } from 'react'
import { Button, Card, Col, Row, Spinner, Table } from 'react-bootstrap'

const index = () => {
	

	return (
		<>
			<PageBreadcrumb title="Loans" subName="Setting" />
			<Row className="mt-3">
				<Col lg={3}>
					<RateTable />
				</Col>
			</Row>
			<Row className="mt-3">
				<Col lg={3}>
					<BorderedTable />
				</Col>
			</Row>
		</>
	)
}

export default index



const RateTable = () => {
	const { data } = useGetSettingQuery(undefined)

	const [rate, setRate] = useState<Number>()
	const [updateSetting, { isLoading ,isError, isSuccess, error }] = useUpdateSettingMutation()

	useEffect(() => {
		if (isSuccess) {
			toast.success('Setting updated successfully')
		} else if (isError && error) {
			toast.error('Failed to update setting')
		}
	}, [isSuccess, isError, error])


	const [rates, setRates] = useState<any>([])

	useEffect(() => {
		if (data) {
			setRates(data.setting.interestRate)
			console.log(data.setting.days)
		}
	}, [data])


	const updateSettingHandler = (data: any) => {
		updateSetting({ rates })
	}

	const submitRates = () => {
		setRates([...rates, { rate }])
		setRate(undefined)
	}

	const deleteRate = (idx: any) => {
		const newRates = [...rates]
		newRates.splice(idx, 1)
		setRates(newRates)
	}

	return (
		<>
			<Card>
				<Card.Header>
					<h4 className="header-title">Rates</h4>
				</Card.Header>
				<Card.Body>
					<div className="table-responsive-sm">
						<Table className="table-bordered table-centered mb-0">
							<thead>
								<tr>
									<th>Rate</th>
									<th className="text-center">Action</th>
								</tr>
							</thead>
							<tbody>
								{(rates || []).map((record: any, idx: any) => {
									return (
										<tr key={idx}>
											<td>{record.rate}</td>
											<td align="center">
												<button
													className="border-0"
													onClick={() => deleteRate(idx)}>
													{' '}
													<i className="ri-delete-bin-2-line" />
												</button>
											</td>
										</tr>
									)
								})}
								<tr>
									<td>
										<FormInput
											type="Number"
											name="text"
											value={String(rate)}
											onChange={(e) => setRate(Number(e.target.value))}
											placeholder="Enter New Day"
											containerClass="mb-3"
											key="textarea"
											className="border-0"
										/>
									</td>
									<td align="center">
										<button className="border-0" onClick={submitRates}>
											{' '}
											<i className=" ri-send-plane-fill" />
										</button>
									</td>
								</tr>
							</tbody>
						</Table>
						<Button variant="primary" className='mt-3' onClick={updateSettingHandler}>
						{ isLoading && <Spinner size='sm' className='me-2' /> }
							Save Changes
						</Button>
					</div>
				</Card.Body>
			</Card>
		</>
	)
}

const BorderedTable = () => {
	const { data } = useGetSettingQuery(undefined)

	const [day, setDay] = useState<Number>()
	const [updateSetting, { isLoading ,isError, isSuccess, error }] = useUpdateSettingMutation()

	useEffect(() => {
		if (isSuccess) {
			toast.success('Setting updated successfully')
		} else if (isError && error) {
			toast.error('Failed to update setting')
		}
	}, [isSuccess, isError, error])

	const [days, setDays] = useState<any>([])
	useEffect(() => {
		if (data) {
			setDays(data.setting.days)
			console.log(data.setting.days)
		}
	}, [data])
	const updateSettingHandler = (data: any) => {
		updateSetting({ days })
	}

	const submitDays = () => {
		setDays([...days, { day }])
		setDay(undefined)
	}

	const deleteDay = (idx: any) => {
		const newDays = [...days]
		newDays.splice(idx, 1)
		setDays(newDays)
	}

	return (
		<>
			<Card>
				<Card.Header>
					<h4 className="header-title">Days</h4>
				</Card.Header>
				<Card.Body>
					<div className="table-responsive-sm">
						<Table className="table-bordered table-centered mb-0">
							<thead>
								<tr>
									<th>Days</th>
									<th className="text-center">Action</th>
								</tr>
							</thead>
							<tbody>
								{(days || []).map((record: any, idx: any) => {
									return (
										<tr key={idx}>
											<td>{record.day}</td>
											<td align="center">
												<button
													className="border-0"
													onClick={() => deleteDay(idx)}>
													{' '}
													<i className="ri-delete-bin-2-line" />
												</button>
											</td>
										</tr>
									)
								})}
								<tr>
									<td>
										<FormInput
											type="Number"
											name="text"
											value={String(day)}
											onChange={(e) => setDay(Number(e.target.value))}
											placeholder="Enter New Day"
											containerClass="mb-3"
											key="textarea"
											className="border-0"
										/>
									</td>
									<td align="center">
										<button className="border-0" onClick={submitDays}>
											{' '}
											<i className=" ri-send-plane-fill" />
										</button>
									</td>
								</tr>
							</tbody>
						</Table>
						<Button variant="primary" className='mt-3' onClick={updateSettingHandler}>
						{ isLoading && <Spinner size='sm' className='me-2' /> }
							Save Changes
						</Button>
					</div>
				</Card.Body>
			</Card>
		</>
	)
}
