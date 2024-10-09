import { FormInput, PageBreadcrumb } from '@/components'
import { useModal } from '@/hooks'



import { Button, Card, Modal,  Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
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
	const [data , setData] = useState<any>([])
	const { token } = useAuth()
	

	useEffect(() => {
		const fetchData = async () => {
		  try {
			const response = await axios.get('http://localhost:3000/api/user/all-users', {
				headers: {
				  Authorization: `Bearer ${token}`, 
				},
			  });
			setData(response.data);
			console.log(data)
		  } catch (error) {
			console.error('Error fetching data:', error);
		  }
		};
		fetchData();
	  }, []);

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
								{(data || []).map((record: any, idx: number) => {
									return (
										<tr key={idx}>
											<td className="table-user">
												<img
													src={`http://localhost:3000${record.firstName}`}
													alt="table-user"
													className="me-2 rounded-circle"
												/>
												&nbsp;{record.name}
											</td>
											<td>{record.firstName}</td>
											<td>{record.mobileNumber}</td>
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
		employeeId: '',
		designation: 'employee',
		location: '',
		file: null,
		firstName: '',
		surName: '',
		email: '',
		password:'',
		nic: '',
		gender: 'male',
		dateOfBirth: '',
		mobileNumber: '',
		address: '',
		civilStatus: 'single',
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
        if (formData.hasOwnProperty(key)) {
            formDataToSend.append(key, formData[key as keyof typeof formData] as any)
        }
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
								name="employeeId"
								value={formData.employeeId}
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
								name="file"
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
								onChange={handleChange}
							>
								<option value="male">Male</option>
								<option value="female">Female</option>
								<option value="other">Other</option>
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
