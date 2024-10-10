import { FormInput, PageBreadcrumb } from '@/components'
import { useModal } from '@/hooks'

import { Button, Card, Image, Modal, Table } from 'react-bootstrap'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuth } from '@/common'

const index = () => {
	return (
		<>
			<PageBreadcrumb title="Employee Management" subName="Master Files" />
			<StripedRows />
		</>
	)
}

export default index

const StripedRows = () => {
	const [data, setData] = useState<any>([])
	const { token } = useAuth()

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					'http://localhost:3000/api/user/all-users',
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				)
				setData(response.data)
				console.log(data)
			} catch (error) {
				console.error('Error fetching data:', error)
			}
		}
		fetchData()
	}, [])

	return (
		<>
			<Card>
				<Card.Header className="d-flex justify-content-between">
					<h4 className="header-title">Employee Management</h4>
					<ModalSizes>
						<Button variant="info">Add New Customer</Button>
					</ModalSizes>
				</Card.Header>
				<Card.Body>
					<div className="table-responsive-sm">
						<Table className="table-striped table-centered mb-0">
							<thead>
								<tr>
									<th>User</th>
									<th>NIC No.</th>
									<th>Mobile</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody>
								{(data || []).map((record: any, idx: number) => {
									return (
										<tr key={idx}>
											<td className="table-user">
												<img
													src={record.profilePicture}
													alt="table-user"
													className="me-2 rounded-circle"
												/>
												&nbsp;{record.firstName}&nbsp;{record.surName}
											</td>
											<td>{record.nic}</td>
											<td>{record.mobileNumber}</td>
											<td className="flex">
												<div className="">
													<ModalSizes type="edit" data={record}>
														<i className="ri-settings-3-line" />
													</ModalSizes>
												</div>
											</td>
										</tr>
									)
								})}
							</tbody>
						</Table>
					</div>
				</Card.Body>
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

	// State to store form data
	const [formData, setFormData] = useState<any>({
		designation: '',
		location: '',
		profilePicture: '',
		firstName: '',
		surName: '',
		email: '',
		password: '',
		nic: '',
		gender: '',
		dateOfBirth: '',
		mobileNumber: '',
		address: '',
		civilStatus: '',
	})

	const handleImageChange = async(e: any) => {
		// setProfilePic(e.target.files[0])
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
				profilePicture: response.data.secure_url,
			}))
		} catch (error) {
			console.error('Error uploading image:', error)
		}
	}

	

	useEffect(() => {
		if (type === 'edit') {
			setFormData({
				designation: data.designation,
				location: data.location,
				profilePicture: data.profilePicture,
				firstName: data.firstName,
				surName: data.surName,
				email: data.email,
				nic: data.nic,
				gender: data.gender,
				dateOfBirth: data.dateOfBirth,
				mobileNumber: data.mobileNumber,
				address: data.address,
				civilStatus: data.civilStatus,
			})
		}
		console.log(data)
	}, [])

	// Handle form input change
	const handleChange = (e: any) => {
		const { name, value, type, files } = e.target

		setFormData((prevData: any) => ({
			...prevData,
			[name]: type === 'file' ? files[0] : value,
		}))
	}

	// Handle form submission
	const onSubmit = async () => {
		try {
			await axios.post(
				`http://localhost:3000/api/${
					type === 'edit' ? `user/update/${data._id}` : 'user/register'
				}`,
				formData,
				{
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer YOUR_TOKEN_HERE`,
					},
				}
			)
			
			toggleModal()
		} catch (error) {
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
						<h4 className="modal-title">Add New Employee</h4>
					</Modal.Header>
					<Modal.Body>
						<form>
							<FormInput
								name="designation"
								label="Designation"
								type="select"
								containerClass="mb-3"
								className="form-select"
								value={formData.designation}
								onChange={handleChange}>
								<option defaultValue="Employee">Employee</option>
								<option value="Admin">Admin</option>
							</FormInput>
							<FormInput
								name="location"
								label="Location"
								type="text"
								containerClass="mb-3"
								value={formData.location}
								onChange={handleChange}
							/>
							<h4 className="header-title">Personal Details</h4>
							{formData.profilePicture && (
								<Image
									src={formData.profilePicture}
									alt="avatar"
									className="img-fluid avatar-lg rounded"
								/>
							)}
							<FormInput
								label="Profile Picture"
								type="file"
								accept="image/*"
								name="file"
								containerClass="mb-3"
								onChange={handleImageChange}
							/>
							<FormInput
								label="First Name"
								type="text"
								name="firstName"
								value={formData.firstName}
								onChange={handleChange}
								containerClass="mb-3"
							/>
							<FormInput
								label="Surname"
								type="text"
								name="surName"
								value={formData.surName}
								onChange={handleChange}
								containerClass="mb-3"
							/>
							<FormInput
								label="Email Address"
								type="text"
								name="email"
								value={formData.email}
								onChange={handleChange}
								containerClass="mb-3"
							/>
							<FormInput
								label="Password"
								type="text"
								name="password"
								value={formData.password}
								onChange={handleChange}
								containerClass="mb-3"
							/>
							<FormInput
								label="Nic Number"
								type="text"
								name="nic"
								value={formData.nic}
								onChange={handleChange}
								containerClass="mb-3"
							/>
							<FormInput
								name="gender"
								label="Gender"
								type="select"
								containerClass="mb-3"
								className="form-select"
								value={formData.gender}
								onChange={handleChange}>
								<option defaultValue={''}>Select ...</option>
								<option value="male">Male</option>
								<option value="female">Female</option>
								<option value="other">Other</option>
							</FormInput>
							{formData.dateOfBirth && (
								<h5>
									Date Of Birth:{' '}
									{new Date(formData.dateOfBirth).toISOString().split('T')[0]}
								</h5>
							)}
							<FormInput
								label="Date Of Birth"
								type="date"
								name="dateOfBirth"
								value={formData.dateOfBirth}
								onChange={handleChange}
								containerClass="mb-3"
							/>
							<FormInput
								label="Mobile Number"
								type="text"
								name="mobileNumber"
								value={formData.mobileNumber}
								onChange={handleChange}
								containerClass="mb-3"
							/>
							<FormInput
								label="Address"
								type="text"
								name="address"
								value={formData.address}
								onChange={handleChange}
								containerClass="mb-3"
							/>
							<FormInput
								name="civilStatus"
								label="Civil Status"
								type="select"
								containerClass="mb-3"
								className="form-select"
								value={formData.civilStatus}
								onChange={handleChange}>
								<option defaultValue={''}>Select ...</option>
								<option value="single">Single</option>
								<option value="married">Married</option>
								<option value="divorced">Divorced</option>
								<option value="widowed">Widowed</option>
							</FormInput>
							<Modal.Footer>
								<Button variant="light" onClick={toggleModal}>
									Close
								</Button>
								<Button onClick={onSubmit}>Save changes</Button>
							</Modal.Footer>
						</form>
					</Modal.Body>
				</Modal>
			</div>
		</>
	)
}
