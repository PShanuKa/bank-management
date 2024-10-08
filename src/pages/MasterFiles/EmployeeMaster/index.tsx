import { FormInput, PageBreadcrumb } from '@/components'
import { useModal } from '@/hooks'
import { records } from '@/pages/ui/tables/data'


import { Button, Card, Modal,  Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'


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
	return (
		<>
			<Card>
				<Card.Header className="d-flex justify-content-between">
					<h4 className="header-title">Employee Management</h4>
					<ModalSizes />
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
								{(records || []).map((record, idx) => {
									return (
										<tr key={idx}>
											<td className="table-user">
												<img
													src={record.image}
													alt="table-user"
													className="me-2 rounded-circle"
												/>
												&nbsp;{record.name}
											</td>
											<td>{record.accountNo}</td>
											<td>{record.dob}</td>
											<td>
												<Link to="#" className="text-reset fs-16 px-1">
													{' '}
													<i className="ri-settings-3-line" />
												</Link>
												<Link to="#" className="text-reset fs-16 px-1">
													{' '}
													<i className="ri-delete-bin-2-line" />
												</Link>
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

const ModalSizes = () => {
	const { isOpen, size, className, scroll, toggleModal, openModalWithSize } =
		useModal()

	// State to store form data
	const [formData, setFormData] = useState({
		employeeID: '',
		designation: 'Employee',
		location: '',
		profilePicture: null,
		firstName: '',
		surName: '',
		emailAddress: '',
		password:'',
		nicNumber: '',
		gender: 'Male',
		dateOfBirth: '',
		mobileNumber: '',
		address: '',
		civilStatus: 'Single',
	})

	// Handle form input change
	const handleChange = (e: any) => {
		const { name, value, type, files } = e.target
		setFormData((prevData: any) => ({
			...prevData,
			[name]: type === 'file' ? files[0] : value, // For file input, store the file object
		}))
	}

	

	// Handle form submission
	const onSubmit = async() => { 
		const formDataToSend = new FormData()

		for (const key in formData) {
			formDataToSend.append(key, formData[key])
		}
		try {
			const response = await axios.post('http://localhost:3000/api/user/register', formDataToSend, {
				headers: {
					'Content-Type': 'multipart/form-data',
					Authorization: `Bearer YOUR_TOKEN_HERE`, // Add your token here
				},
			})
			console.log('Form submitted successfully:', response.data)
			toggleModal() 
		} catch (error) {
			console.error('Error submitting the form:', error)
		}
	}


	return (
		<>
			<div className="d-flex flex-wrap gap-2">
				<Button variant="info" onClick={() => openModalWithSize('lg')}>
					Add New Employee
				</Button>

				<Modal
					className="fade"
					show={isOpen}
					onHide={toggleModal}
					dialogClassName={className}
					size={size}
					scrollable={scroll}
				>
					<Modal.Header onHide={toggleModal} closeButton>
						<h4 className="modal-title">Add New Employee</h4>
					</Modal.Header>
					<Modal.Body>
						<form>
							<FormInput
								label="Employee ID"
								type="text"
								name="employeeID"
								value={formData.employeeID}
								onChange={handleChange}
								containerClass="mb-3"
								
							/>
							<FormInput
								name="designation"
								label="Designation"
								type="select"
								containerClass="mb-3"
								className="form-select"
								value={formData.designation}
								onChange={handleChange}
							>
								<option value="Employee">Employee</option>
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
							<FormInput
								label="Profile Picture"
								type="file"
								name="profilePicture"
								containerClass="mb-3"
								onChange={handleChange}
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
								name="emailAddress"
								value={formData.emailAddress}
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
								name="nicNumber"
								value={formData.nicNumber}
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
								onChange={handleChange}
							>
								<option value="Male">Male</option>
								<option value="Female">Female</option>
								<option value="Other">Other</option>
							</FormInput>
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
								onChange={handleChange}
							>
								<option value="Single">Single</option>
								<option value="Married">Married</option>
								<option value="Divorced">Divorced</option>
								<option value="Widowed">Widowed</option>
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
