import { useAuth } from '@/common'
import { FormInput, PageBreadcrumb } from '@/components'
import { useModal } from '@/hooks'

import axios from 'axios'
import { toast } from 'material-react-toastify'
import { useEffect, useState } from 'react'

import { Button, Card, Form, Modal, Placeholder, Table } from 'react-bootstrap'

const index = () => {
	return (
		<>
			<PageBreadcrumb title="Loans" subName="Transactions" />
			<StripedRows />
		</>
	)
}

export default index

const StripedRows = () => {
	const [data, setData] = useState<any>([])
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true)
			try {
				const response = await axios.get(
					`${import.meta.env.VITE_API_URL}/api/area/all`,
					{
						headers: {
							Authorization: `Bearer YOUR_TOKEN_HERE`,
						},
					}
				)
				setData(response.data.areas)
			} catch (error) {
				console.error('Error fetching data:', error)
			}
			setLoading(false)
		}
		fetchData()
	}, [])
	return (
		<>
			<Card>
				<Card.Header className="d-flex justify-content-between">
					<h4 className="header-title">Loans</h4>
					<ModalSizes>
						<Button variant="info">Start Loans</Button>
					</ModalSizes>
				</Card.Header>
				<Card.Body>
					<div className="table-responsive-sm">
						<Table className="table-striped table-centered mb-0">
							<thead>
								<tr>
									<th>Area Name</th>
									{/* <th>Area Code</th> */}
									<th>Employee</th>
									<th>Collecting Date</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody>
								{!loading
									? (data || []).map((record: any, idx: any) => {
											return (
												<tr key={idx}>
													<td className="table-user">&nbsp;{record.name}</td>
													{/* <td>{record.code}</td> */}
													<td>
														{record.employeeId
															? record.employeeId.firstName
															: ''}
														&nbsp;
														{record.employeeId
															? record.employeeId.surName
															: ''}{' '}
													</td>
													<td>{record.date}</td>
													<td>
														<ModalSizes type="edit" data={record}>
															<i className="ri-settings-3-line" />
														</ModalSizes>
													</td>
												</tr>
											)
									  })
									: [...Array(4)].map((_, i) => (
											<tr key={i}>
												<td>
													<Placeholder as="p" animation="glow">
														<Placeholder style={{ width: '25%' }} />
													</Placeholder>
												</td>
												<td>
													<Placeholder as="p" animation="glow">
														<Placeholder style={{ width: '25%' }} />
													</Placeholder>
												</td>

												<td>
													<Placeholder as="p" animation="glow">
														<Placeholder style={{ width: '25%' }} />
													</Placeholder>
												</td>
												<td>
													<Placeholder.Button as="p" animation="glow">
														<Placeholder style={{ width: '25%' }} />
													</Placeholder.Button>
												</td>
											</tr>
									  ))}
							</tbody>
						</Table>
					</div>
				</Card.Body>
				{loading === false && data && data.length === 0 && (
					<div className="d-flex justify-content-center p-3">
						<h4>No Data</h4>
					</div>
				)}
			</Card>
		</>
	)
}

const ModalSizes = ({
	children,
	type,
	data,
}: {
	children: any
	type?: string
	data?: any
}) => {
	const { isOpen, size, className, scroll, toggleModal, openModalWithSize } =
		useModal()
	const [userData, setUserData] = useState<any>([])
	const [durationFormOpen, setDurationFormOpen] = useState<boolean>(false)
	const { token } = useAuth()

	const [formData, setFormData] = useState({
		location: '',
		customerCode: '',
		loanDuration: 0,
		ofInstallments: 0,
		areaId: '',
		loanAmount: 0,
		interestRate: 40,
		startDate: new Date().toISOString().substr(0, 10),
		endDate: '',
	})

	// useEffect(() => {
	// 	if (type === 'edit') {
	// 		setFormData({
	// 			name: data.name,
	// 			loanDuration: data.loanDuration,
	// 			// date: data.date,
	// 			// employeeId: data.employeeId,
	// 		})
	// 	}
	// 	console.log(data)
	// }, [])

	const handleChange = (e: any) => {
		const { name, value, type, files } = e.target
		setFormData((prevData: any) => ({
			...prevData,
			[name]: type === 'file' ? files[0] : value,
		}))
	}

	const handleSelectChange = (e: any) => {
		setDurationFormOpen(true)
	}

	// useEffect(() => {
	// 	const fetchData = async () => {
	// 		try {
	// 			const response = await axios.get(
	// 				`${import.meta.env.VITE_API_URL}/api/user/all-users`,
	// 				{
	// 					headers: {
	// 						Authorization: `Bearer ${token}`,
	// 					},
	// 				}
	// 			)
	// 			setUserData(response.data.users)
	// 		} catch (error) {
	// 			console.error('Error fetching data:', error)
	// 		}
	// 	}
	// 	fetchData()
	// }, [])

	const onSubmit = async () => {
		try {
			const response = await axios.post(
				`${import.meta.env.VITE_API_URL}/api/${
					type === 'edit' ? `area/update/${data._id}` : 'area/create'
				}`,
				formData,
				{
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer YOUR_TOKEN_HERE`,
					},
				}
			)
			if (response && response.data.message) {
				toast.success(response.data.message)
			} else {
				toast.success(`Area ${type === 'edit' ? 'updated' : 'added'}`)
			}

			toggleModal()
		} catch (error: any) {
			if (
				error.response &&
				error.response.data &&
				error.response.data.message
			) {
				toast.error(error.response.data.message)
			} else {
				toast.error('Error submitting the form')
			}
			console.error('Error submitting the form:', error)
		}
	}

	return (
		<>
			<div className="d-flex flex-wrap gap-2">
				<div onClick={() => openModalWithSize('lg')} className="flex">
					<>{children}</>
				</div>

				<Modal
					className="fade"
					show={isOpen}
					onHide={toggleModal}
					dialogClassName={className}
					size={size}
					scrollable={scroll}>
					<Modal.Header onHide={toggleModal} closeButton>
						<h4 className="modal-title">
							{type === 'edit' ? 'Loan Edit' : 'Loan Start'}
						</h4>
					</Modal.Header>
					<Modal.Body>
						<form>
							<FormInput
								label="Location"
								type="text"
								name="location"
								value={formData.location}
								onChange={handleChange}
								containerClass="mb-3"
							/>
							<FormInput
								label="Customer Code"
								type="text"
								name="customerCode"
								value={formData.customerCode}
								onChange={handleChange}
								containerClass="mb-3"
							/>
							<FormInput
								label="Area"
								type="select"
								name="area"
								value={formData.areaId}
								onChange={handleChange}
								containerClass="mb-3"
								className="form-select">
								<option defaultValue={''}></option>
								<option value="option1">Option 1</option>
								<option value="option1">Option 1</option>
								<option value="option1">Option 1</option>
							</FormInput>
							<div className="bg-light rounded p-1 mb-3"></div>

							<h4>Loan Details</h4>
							<h5>Loan Duration : {formData.loanDuration} Days</h5>
							<h5>Loan Amount (Rs): {formData.loanAmount}</h5>
							<h5>Interest Rate : {formData.interestRate}%</h5>
							<h5 style={{ color: 'red' }}>
								Total Amount (Rs):{' '}
								{(
									(Number(formData.loanAmount) *
										Number(formData.interestRate)) /
										100 +
									Number(formData.loanAmount)
								).toFixed(2)}
							</h5>

							<h5 className="mt-3">
								Of Installments : {formData.ofInstallments}
							</h5>
							<h5 style={{ color: 'red' }}>
								Amount Per Installment (Rs):{' '}
								{(
									((Number(formData.loanAmount) *
										Number(formData.interestRate)) /
										100 +
										Number(formData.loanAmount)) /
									(formData.ofInstallments || 1)
								).toFixed(2)}
							</h5>

							<div className="my-2">
								<Form.Check
									type="radio"
									id="customRadio1"
									name="loanDuration"
									value={65}
									onChange={handleChange}
									label="65 Days"
								/>
								<Form.Check
									type="radio"
									id="customRadio2"
									value={70}
									name="loanDuration"
									onChange={handleChange}
									label="70 Days"
								/>
								<Form.Check
									type="radio"
									id="customRadio3"
									name="loanDuration"
									value={80}
									onChange={handleSelectChange}
									label="Special Loan"
								/>
							</div>
							{durationFormOpen && (
								<FormInput
									label="Duration Days"
									type="number"
									name="loanDuration"
									value={formData.loanDuration}
									onChange={handleChange}
									containerClass="mb-3"
								/>
							)}
							<FormInput
								label="Loan Amount"
								type="number"
								name="loanAmount"
								value={formData.loanAmount}
								onChange={handleChange}
								containerClass="mb-3"
							/>

							<FormInput
								label="interest (%)"
								type="number"
								name="interestRate"
								value={formData.interestRate}
								onChange={handleChange}
								containerClass="mb-3"
							/>
							<FormInput
								label="# Of Installments"
								type="number"
								name="ofInstallments"
								value={formData.ofInstallments}
								onChange={handleChange}
								containerClass="mb-3"
							/>
							<div className="bg-light rounded p-1 mb-3"></div>
							<FormInput
								label="Start Date"
								type="date"
								name="startDate"
								value={formData.startDate}
								onChange={handleChange}
								containerClass="mb-3"
							/>

							<FormInput
								label="End Date"
								type="date"
								name="endDate"
								value={formData.endDate}
								onChange={handleChange}
								containerClass="mb-3"
							/>
						</form>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="light" onClick={toggleModal}>
							Close
						</Button>{' '}
						<Button onClick={onSubmit}>Save changes</Button>
					</Modal.Footer>
				</Modal>
			</div>
		</>
	)
}
