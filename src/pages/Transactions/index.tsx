import { useAuth } from '@/common'
import { FormInput, PageBreadcrumb } from '@/components'
import { useModal } from '@/hooks'

import axios from 'axios'
import { toast } from 'material-react-toastify'
import { useEffect, useState } from 'react'

import {
	Button,
	Card,
	Form,
	Image,
	Modal,
	Placeholder,
	Spinner,
	Table,
} from 'react-bootstrap'
import { set } from 'react-hook-form'

const index = () => {
	return (
		<>
			<PageBreadcrumb title="Loans" subName="Transactions" />
			<PendingLoans />
			<StripedRows />
		</>
	)
}

export default index

const PendingLoans = () => {
	const [data, setData] = useState<any>([])
	const [loading, setLoading] = useState(false)
	const [StatusFilter, setStatusFilter] = useState('')

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true)
			try {
				const response = await axios.get(
					`${import.meta.env.VITE_API_URL}/api/loan?status=Pending`,
					{
						headers: {
							Authorization: `Bearer YOUR_TOKEN_HERE`,
						},
					}
				)
				setData(response.data.Loans)
			} catch (error) {
				console.error('Error fetching data:', error)
			}
			setLoading(false)
		}
		fetchData()
	}, [StatusFilter])
	return (
		<>
			<Card>
				<Card.Header className="d-flex justify-content-between">
					<h4 className="header-title">Pending Loans</h4>
				</Card.Header>
				<Card.Body>
					<div className="table-responsive-sm">
						<Table className="table-striped table-centered mb-0">
							<thead>
								<tr>
									<th>Loan ID</th>
									<th>Customer ID</th>
									<th>Customer Name</th>
									<th>Amount</th>
									<th>Of Installments</th>
									<th>Status</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody>
								{!loading
									? (data || []).map((record: any, idx: any) => {
											return (
												<tr key={idx}>
													<td>{record.loanCode}</td>
													<td className="table-user">
														&nbsp;{record?.customerCode?.customerCode}
													</td>
													<td className="table-user">
														{record?.customerCode?.firstName}&nbsp;
														{record?.customerCode?.surName}
													</td>
													<td className="table-user">{record?.loanAmount}</td>
													<td className="table-user">
														{record?.ofInstallments}
													</td>
													<td className="table-user">{record?.status}</td>

													<td>
														<div className="d-flex gap-2">
															<ActionModal data={record}>
																<i className="ri-check-line" />
															</ActionModal>
														</div>
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

const StripedRows = () => {
	const [data, setData] = useState<any>([])
	const [loading, setLoading] = useState(false)
	const [StatusFilter, setStatusFilter] = useState('')

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true)
			try {
				const response = await axios.get(
					`${import.meta.env.VITE_API_URL}/api/loan?status=${StatusFilter}`,
					{
						headers: {
							Authorization: `Bearer YOUR_TOKEN_HERE`,
						},
					}
				)
				setData(response.data.Loans)
			} catch (error) {
				console.error('Error fetching data:', error)
			}
			setLoading(false)
		}
		fetchData()
	}, [StatusFilter])
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
					<div style={{ maxWidth: '300px' }}>
						<FormInput
							label="Loan Status"
							type="select"
							name="areaId"
							onChange={(e) => setStatusFilter(e.target.value)}
							containerClass="mb-3"
							className="form-select">
							<option defaultValue={''} value={''}>
								All
							</option>
							<option value="Pending">Pending</option>
							<option value="Approved">Approved</option>
							<option value="Finished">Finished</option>
							<option value="Rejected">Rejected</option>
						</FormInput>
					</div>
					<div className="table-responsive-sm">
						<Table className="table-striped table-centered mb-0">
							<thead>
								<tr>
									<th>Loan ID</th>
									{/* <th>Area Code</th> */}
									<th>Customer ID</th>
									<th>Customer Name</th>
									<th>Amount</th>
									<th>Of Installments</th>
									<th>Status</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody>
								{!loading
									? (data || []).map((record: any, idx: any) => {
											return (
												<tr key={idx}>
													<td>{record.loanCode}</td>
													<td className="table-user">
														&nbsp;{record?.customerCode?.customerCode}
													</td>
													<td className="table-user">
														{record?.customerCode?.firstName}&nbsp;
														{record?.customerCode?.surName}
													</td>
													<td className="table-user">{record?.loanAmount}</td>
													<td className="table-user">
														{record?.ofInstallments}
													</td>
													<td className="table-user">{record?.status}</td>

													<td className="d-flex gap-3">
														{/* <ViewModal data={record}>
															<i className=" ri-global-line" />
														</ViewModal> */}
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
	const [areaData, setAreaData] = useState<any>([])
	const [customerData, setCustomerData] = useState<any>([])
	const [cCode, setCCode] = useState<any>('')
	const [gCode, setGCode] = useState<any>('')
	const [guarantorData, setGuarantorData] = useState<any>([])
	const { token } = useAuth()

	const [formData, setFormData] = useState<any>({
		location: '',
		customerCode: '',
		guarantorCode: '',
		loanDuration: 0,
		ofInstallments: 0,
		areaId: '',
		collectWeek: '',
		collectDay: '',
		loanAmount: 0,
		interestRate: 40,
		startDate: new Date().toISOString().substr(0, 10),
		endDate: '',
		description: '',
		loanCode: '',
	})
	console.log(data)
	useEffect(() => {
		if (type === 'edit') {
			setFormData({
				location: data.location,
				loanDuration: data.loanDuration,
				ofInstallments: data.ofInstallments,
				areaId: data.areaId,
				collectWeek: data.collectWeek,
				collectDay: data.collectDay,
				loanAmount: data.loanAmount,
				interestRate: data.interestRate,
				startDate: data.startDate,
				endDate: data.endDate,
				description: data.description,
				loanCode: data.loanCode,
			})
			setCCode(data.customerCode?.customerCode)
			setGCode(data.guarantorCode?.guarantorCode)
		}
	}, [])

	const handleChange = (e: any) => {
		const { name, value, type, files } = e.target
		setFormData((prevData: any) => ({
			...prevData,
			[name]: type === 'file' ? files[0] : value,
		}))
	}

	const GenerateCode = () => {
		const code = `L${Math.floor(Math.random() * 10000000)}`
		setFormData((prevData: any) => ({
			...prevData,
			loanCode: code,
		}))
	}

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					`${import.meta.env.VITE_API_URL}/api/area/all`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				)
				setAreaData(response.data.areas)
			} catch (error) {
				console.error('Error fetching data:', error)
			}
		}
		fetchData()
	}, [])

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					`${
						import.meta.env.VITE_API_URL
					}/api/customer/search?customerCode=${cCode}`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				)
				if (response.data.success == true) {
					setCustomerData(response.data.customers)
					setFormData((prevData: any) => ({
						...prevData,
						customerCode: response.data.customers[0]._id,
					}))
				} else {
					setCustomerData({})
					setFormData((prevData: any) => ({
						...prevData,
						customerCode: '',
					}))
				}
				console.log(customerData)
			} catch (error) {
				console.error('Error fetching data:', error)
			}
		}
		if (cCode) {
			fetchData()
		} else {
			setCustomerData({})
			setFormData((prevData: any) => ({
				...prevData,
				customerCode: '',
			}))
		}
	}, [cCode])

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					`${
						import.meta.env.VITE_API_URL
					}/api/guarantor/search?guarantorCode=${gCode}`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				)
				if (response.data.success == true) {
					setGuarantorData(response.data.guarantors)
					setFormData((prevData: any) => ({
						...prevData,
						guarantorCode: response.data.guarantors[0]._id,
					}))
				} else {
					setGuarantorData({})
					setFormData((prevData: any) => ({
						...prevData,
						guarantorCode: '',
					}))
				}
			} catch (error) {
				console.error('Error fetching data:', error)
			}
		}
		if (gCode) {
			fetchData()
		} else {
			setGuarantorData({})
			setFormData((prevData: any) => ({
				...prevData,
				guarantorCode: '',
			}))
		}
	}, [gCode])

	const onSubmit = async () => {
		try {
			const response = await axios.post(
				`${import.meta.env.VITE_API_URL}/api/${
					type === 'edit' ? `loan/update/${data._id}` : 'loan/create'
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
				toast.success(`Loan ${type === 'edit' ? 'updated' : 'added'}`)
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
								label="Loan Code"
								type="text"
								name="loanCode"
								containerClass="mb-3"
								value={formData.loanCode}
								onChange={handleChange}
							/>
							<Button onClick={GenerateCode} className="mb-3">
								Generate Code
							</Button>
							{customerData.length > 0 && (
								<>
									<h5>Customer Details</h5>
									<p>
										Name: {customerData[0].firstName} {customerData[0].surName}
									</p>
									{customerData[0].nic && <p>Nic: {customerData[0].nic}</p>}
								</>
							)}
							<FormInput
								label="Customer Code"
								type="text"
								name="customerCode"
								value={cCode}
								onChange={(e) => {
									setCCode(e.target.value)
								}}
								containerClass="mb-3"
							/>

							{guarantorData.length > 0 && (
								<>
									<h5>Guarantor Details</h5>
									<p>
										Name: {guarantorData[0].firstName}{' '}
										{guarantorData[0].surName}
									</p>
									{guarantorData[0].nic && <p>Nic: {guarantorData[0].nic}</p>}
								</>
							)}
							<FormInput
								label="Guarantor Code"
								type="text"
								name="guarantorCode"
								value={gCode}
								onChange={(e) => {
									setGCode(e.target.value)
								}}
								containerClass="mb-3"
							/>
							<FormInput
								label="Area"
								type="select"
								name="areaId"
								value={formData.areaId}
								onChange={handleChange}
								containerClass="mb-3"
								className="form-select">
								<option defaultValue={''}>Choose...</option>
								{(areaData || []).map((area: any, idx: number) => (
									<option key={idx} value={area._id}>
										{area.name}
									</option>
								))}
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
							</div>

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
								disabled
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
								disabled
								value={formData.startDate + formData.loanDuration}
								onChange={handleChange}
								containerClass="mb-3"
							/>
							<div className="bg-light rounded p-1 mb-3"></div>
							<h4>Collecting Type</h4>
							<FormInput
								label="Select Week"
								type="select"
								name="collectWeek"
								value={formData.collectWeek}
								onChange={handleChange}
								containerClass="mb-3"
								className="form-select">
								<option value="" defaultValue="">
									Select Week
								</option>
								<option value="Weekly 1">Weekly 1</option>
								<option value="Weekly 2">Weekly 2</option>
								<option value="Weekly 3">Weekly 3</option>
								<option value="Weekly 4">Weekly 4</option>
							</FormInput>
							<FormInput
								label="Select Day"
								type="select"
								name="collectDay"
								value={formData.collectDay}
								onChange={handleChange}
								containerClass="mb-3"
								className="form-select">
								<option defaultValue="">Select Day</option>
								<option value="Monday">Monday</option>
								<option value="Tuesday">Tuesday</option>
								<option value="Wednesday">Wednesday</option>
								<option value="Thursday">Thursday</option>
								<option value="Friday">Friday</option>
								<option value="Saturday">Saturday</option>
								<option value="Sunday">Sunday</option>
							</FormInput>
							<div className="bg-light rounded p-1 mb-3"></div>
							<FormInput
								label="Description (Optional)"
								type="textarea"
								name="description"
								value={formData.description}
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

const ActionModal = ({ children, data }: { children: any; data?: any }) => {
	const { isOpen, size, className, scroll, toggleModal, openModalWithSize } =
		useModal()

	const [imageLoading, setImageLoading] = useState<Boolean>(false)

	const [formData, setFormData] = useState<any>({
		description: '',
		status: 'Approved',
		imageUrl: '',
	})

	const handleChange = (e: any) => {
		const { name, value, type, files } = e.target
		setFormData((prevData: any) => ({
			...prevData,
			[name]: type === 'file' ? files[0] : value,
		}))
	}

	const onSubmit = async ({ type }: any) => {
		if (type === 'Approved') {
			formData.status = 'Approved'
		} else if (type === 'Rejected') {
			formData.status = 'Rejected'
		}
		try {
			const response = await axios.post(
				`${import.meta.env.VITE_API_URL}/api/loan/action/${data._id}`,
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
				toast.success(`Loan ${type === 'edit' ? 'updated' : 'added'}`)
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

	const handleImageChange = async (e: any) => {
		// setProfilePic(e.target.files[0])
		setImageLoading(true)
		const formData = new FormData()
		formData.append('file', e.target.files[0])
		formData.append('upload_preset', 'tfrt1byi')
		try {
			const response = await axios.post(
				'https://api.cloudinary.com/v1_1/dldtrjalo/image/upload',
				formData
			)
			setFormData((prevData: any) => ({
				...prevData,
				imageUrl: response.data.secure_url,
			}))
			toast.success('Image uploaded successfully')
		} catch (error) {
			toast.error('Error uploading image')
			console.error('Error uploading image:', error)
		}
		setImageLoading(false)
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
						<h4 className="modal-title">Loan Action</h4>
					</Modal.Header>
					<Modal.Body>
						<form>
							<FormInput
								label="Description (Optional)"
								type="textarea"
								name="description"
								value={formData.description}
								onChange={handleChange}
								containerClass="mb-3"
							/>
							<h5>Payment Receipt</h5>
							{imageLoading && <Spinner className="m-2" />}
							{formData.imageUrl && (
								<Image
									src={formData.imageUrl}
									alt="avatar"
									className="img-fluid avatar-lg rounded"
								/>
							)}
							<FormInput
								type="file"
								accept="image/*"
								name="file"
								containerClass="mb-3"
								onChange={handleImageChange}
							/>
						</form>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="light" onClick={toggleModal}>
							Close
						</Button>{' '}
						<Button
							onClick={() => onSubmit({ type: 'Rejected' })}
							variant="danger">
							Rejected
						</Button>
						<Button
							onClick={() => onSubmit({ type: 'Approved' })}
							variant="success">
							Approved
						</Button>
					</Modal.Footer>
				</Modal>
			</div>
		</>
	)
}

// const ViewModal = ({ children, data }: { children: any; data?: any }) => {
// 	const { isOpen, size, className, scroll, toggleModal, openModalWithSize } =
// 		useModal()
// 	const [areaData, setAreaData] = useState<any>([])
// 	const [customerData, setCustomerData] = useState<any>([])
// 	const [cCode, setCCode] = useState<any>('')
// 	const [gCode, setGCode] = useState<any>('')
// 	const [guarantorData, setGuarantorData] = useState<any>([])
// 	const { token } = useAuth()

// 	const [formData, setFormData] = useState<any>({
// 		location: '',
// 		customerCode: '',
// 		guarantorCode: '',
// 		loanDuration: 0,
// 		ofInstallments: 0,
// 		areaId: '',
// 		collectWeek: '',
// 		collectDay: '',
// 		loanAmount: 0,
// 		interestRate: 40,
// 		startDate: new Date().toISOString().substr(0, 10),
// 		endDate: '',
// 		description: '',
// 		loanCode: '',
// 	})
// 	console.log(data)
// 	useEffect(() => {
// 		setFormData({
// 			location: data.location,
// 			loanDuration: data.loanDuration,
// 			ofInstallments: data.ofInstallments,
// 			areaId: data.areaId,
// 			collectWeek: data.collectWeek,
// 			collectDay: data.collectDay,
// 			loanAmount: data.loanAmount,
// 			interestRate: data.interestRate,
// 			startDate: data.startDate,
// 			endDate: data.endDate,
// 			description: data.description,
// 			loanCode: data.loanCode,
// 		})
// 		setCCode(data.customerCode?.customerCode)
// 		setGCode(data.guarantorCode?.guarantorCode)
// 	}, [])

	

// 	useEffect(() => {
// 		const fetchData = async () => {
// 			try {
// 				const response = await axios.get(
// 					`${import.meta.env.VITE_API_URL}/api/area/all`,
// 					{
// 						headers: {
// 							Authorization: `Bearer ${token}`,
// 						},
// 					}
// 				)
// 				setAreaData(response.data.areas)
// 			} catch (error) {
// 				console.error('Error fetching data:', error)
// 			}
// 		}
// 		fetchData()
// 	}, [])

// 	useEffect(() => {
// 		const fetchData = async () => {
// 			try {
// 				const response = await axios.get(
// 					`${
// 						import.meta.env.VITE_API_URL
// 					}/api/customer/search?customerCode=${cCode}`,
// 					{
// 						headers: {
// 							Authorization: `Bearer ${token}`,
// 						},
// 					}
// 				)
// 				if (response.data.success == true) {
// 					setCustomerData(response.data.customers)
// 					setFormData((prevData: any) => ({
// 						...prevData,
// 						customerCode: response.data.customers[0]._id,
// 					}))
// 				} else {
// 					setCustomerData({})
// 					setFormData((prevData: any) => ({
// 						...prevData,
// 						customerCode: '',
// 					}))
// 				}
// 				console.log(customerData)
// 			} catch (error) {
// 				console.error('Error fetching data:', error)
// 			}
// 		}
// 		if (cCode) {
// 			fetchData()
// 		} else {
// 			setCustomerData({})
// 			setFormData((prevData: any) => ({
// 				...prevData,
// 				customerCode: '',
// 			}))
// 		}
// 	}, [cCode])

// 	useEffect(() => {
// 		const fetchData = async () => {
// 			try {
// 				const response = await axios.get(
// 					`${
// 						import.meta.env.VITE_API_URL
// 					}/api/guarantor/search?guarantorCode=${gCode}`,
// 					{
// 						headers: {
// 							Authorization: `Bearer ${token}`,
// 						},
// 					}
// 				)
// 				if (response.data.success == true) {
// 					setGuarantorData(response.data.guarantors)
// 					setFormData((prevData: any) => ({
// 						...prevData,
// 						guarantorCode: response.data.guarantors[0]._id,
// 					}))
// 				} else {
// 					setGuarantorData({})
// 					setFormData((prevData: any) => ({
// 						...prevData,
// 						guarantorCode: '',
// 					}))
// 				}
// 			} catch (error) {
// 				console.error('Error fetching data:', error)
// 			}
// 		}
// 		if (gCode) {
// 			fetchData()
// 		} else {
// 			setGuarantorData({})
// 			setFormData((prevData: any) => ({
// 				...prevData,
// 				guarantorCode: '',
// 			}))
// 		}
// 	}, [gCode])

// 	return (
// 		<>
// 			<div className="d-flex flex-wrap gap-2">
// 				<div onClick={() => openModalWithSize('lg')} className="flex">
// 					<>{children}</>
// 				</div>

// 				<Modal
// 					className="fade"
// 					show={isOpen}
// 					onHide={toggleModal}
// 					dialogClassName={className}
// 					size={size}
// 					scrollable={scroll}>
// 					<Modal.Header onHide={toggleModal} closeButton>
// 						<h4 className="modal-title">Loan Details</h4>
// 					</Modal.Header>
// 					<Modal.Body>
// 						<form>
// 							<p>
// 								Location: <span>{formData.location}</span>
// 							</p>
// 							<p>
// 								Loan Code: <span>{formData.loanCode}</span>
// 							</p>
// 							<div className="bg-light rounded p-1 mb-3"></div>

// 							{customerData.length > 0 && (
// 								<>
// 									<Image
// 										src={customerData[0].profilePicture}
// 										/>
// 									<h5>Customer Details</h5>
// 									<p>
// 										Customer Code: <span>{cCode || null}</span>
// 									</p>
// 									<p>
// 										Name: {customerData[0].firstName} {customerData[0].surName}
// 									</p>
// 									{customerData[0].nic && <p>Nic: {customerData[0].nic}</p>}
// 								</>
// 							)}
// 							<div className="bg-light rounded p-1 mb-3"></div>
// 							{guarantorData.length > 0 && (
// 								<>
// 									<h5>Guarantor Details</h5>
// 									<p>
// 										Guarantor Code: <span>{gCode || null}</span>
// 									</p>
// 									<p>
// 										Name: {guarantorData[0].firstName}{' '}
// 										{guarantorData[0].surName}
// 									</p>
// 									{guarantorData[0].nic && <p>Nic: {guarantorData[0].nic}</p>}
// 								</>
// 							)}

// 							{/* <h6>Area : ad </h6>
// 							<FormInput
// 								label="Area"
// 								type="select"
// 								name="areaId"
// 								value={formData.areaId}
// 								onChange={handleChange}
// 								containerClass="mb-3"
// 								className="form-select">
// 								<option defaultValue={''}>Choose...</option>
// 								{(areaData || []).map((area: any, idx: number) => (
// 									<option key={idx} value={area._id}>
// 										{area.name}
// 									</option>
// 								))}
// 							</FormInput> */}

// 							<div className="bg-light rounded p-1 mb-3"></div>

// 							<h4>Loan Details</h4>
// 							<h5>Loan Duration : {formData.loanDuration} Days</h5>
// 							<h5>Loan Amount (Rs): {formData.loanAmount}</h5>
// 							<h5>Interest Rate : {formData.interestRate}%</h5>
// 							<h5 style={{ color: 'red' }}>
// 								Total Amount (Rs):{' '}
// 								{(
// 									(Number(formData.loanAmount) *
// 										Number(formData.interestRate)) /
// 										100 +
// 									Number(formData.loanAmount)
// 								).toFixed(2)}
// 							</h5>

// 							<h5 className="mt-3">
// 								Of Installments : {formData.ofInstallments}
// 							</h5>
// 							<h5 style={{ color: 'red' }}>
// 								Amount Per Installment (Rs):{' '}
// 								{(
// 									((Number(formData.loanAmount) *
// 										Number(formData.interestRate)) /
// 										100 +
// 										Number(formData.loanAmount)) /
// 									(formData.ofInstallments || 1)
// 								).toFixed(2)}
// 							</h5>

// 							<div className="bg-light rounded p-1 mb-3"></div>

// 							<p>Start Date : {formData.startDate}</p>

// 							<h4>Collecting Type</h4>
// 							<p>Collecting Week : {formData.collectWeek}</p>
// 							<p>Collecting Day : {formData.collectDay}</p>

// 							{formData.description && (
// 								<>
// 									<div className="bg-light rounded p-1 mb-3"></div>
// 									<p>Description : {formData.description}</p>
// 								</>
// 							)}
// 						</form>
// 					</Modal.Body>
// 					<Modal.Footer>
// 						<Button variant="light" onClick={toggleModal}>
// 							Close
// 						</Button>
// 					</Modal.Footer>
// 				</Modal>
// 			</div>
// 		</>
// 	)
// }
