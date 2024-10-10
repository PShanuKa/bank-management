import { useAuth } from '@/common'
import { FormInput, PageBreadcrumb } from '@/components'
import { useModal } from '@/hooks'
import axios from 'axios'
import { toast } from 'material-react-toastify'
import { useEffect, useState } from 'react'
import { Button, Card, Image, Modal, Table } from 'react-bootstrap'

const index = () => {
	return (
		<>
			<PageBreadcrumb title="Guarantor Master" subName="Master Files" />
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
					`${import.meta.env.VITE_API_URL}/api/guarantor/all`,
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
					<h4 className="header-title">Guarantor Master</h4>
					<ModalSizes>
						<Button variant="info">Add New Customer</Button>
					</ModalSizes>
				</Card.Header>
				<Card.Body>
					<div className="table-responsive-sm">
						<Table className="table-striped table-centered mb-0">
							<thead>
								<tr>
									<th>Name</th>
									<th>Nic Number</th>
									<th>Location</th>
									<th>Gender</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody>
							{(data || []).map((record: any, idx: number) => {
									return (
										<tr key={idx}>
											<td className="table-user">
												{record.profilePicture && 
												<img
												src={record.profilePicture}
												alt="table-user"
												className="me-2 rounded-circle"
												/>
											}
												&nbsp;{record.firstName}&nbsp;{record.surName}
											</td>
											<td>{record.nic}</td>
											<td>{record.location}</td>
											<td>{record.gender}</td>
											<td>
											<ModalSizes type="edit" data={record}>
													<i className="ri-settings-3-line" />
												</ModalSizes>
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
	const [profilePic, setProfilePic] = useState<any>(null)

	const [formData, setFormData] = useState({
		nic: '',
		location: '',
		firstName: '',
		surName: '',
		address: '',
		number: '',
		gender: '',
		dateOfBirth: '',
		civilStatus: '',
		profilePicture: '',
	})

	useEffect(() => {
		if (type === 'edit') {
			setFormData({
				nic: data.nic,
				location: data.location,
				firstName: data.firstName,
				surName: data.surName,
				address: data.address,
				number: data.number,
				gender: data.gender,
				dateOfBirth: data.dateOfBirth,
				civilStatus: data.civilStatus,
				profilePicture: data.profilePicture,
			})
		}
		console.log(data)
	}, [])

	const handleImageChange = (e: any) => {
		setProfilePic(e.target.files[0])
	}

	const handleImageUpload = async () => {
		const formData = new FormData()
		formData.append('file', profilePic)
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
			toast.success('Image uploaded successfully')
		} catch (error) {
			toast.error('Error uploading image')
			console.error('Error uploading image:', error)
		}
	}

	const handleChange = (e: any) => {
		const { name, value, type, files } = e.target

		setFormData((prevData: any) => ({
			...prevData,
			[name]: type === 'file' ? files[0] : value, 
		}))
	}

	const onSubmit = async () => {
		try {
			 await axios.post(
				
				`${import.meta.env.VITE_API_URL}/api/${
					type === 'edit' ? `guarantor/update/${data._id}` : 'guarantor/create'
				}`,
				formData,
				{
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer YOUR_TOKEN_HERE`, 
					},
				}
			)

			toast.success(`Guarantor ${type === 'edit' ? 'updated' : 'added'}`)
			toggleModal() 
		} catch (error) {
			toast.error('Error submitting the form')
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
						<h4 className="modal-title">Guarantor Create</h4>
					</Modal.Header>
					<Modal.Body>
						<FormInput
							label="NIC"
							type="text"
							name="nic"
							value={formData.nic}
							containerClass="mb-3"
							onChange={handleChange}
						/>
						<FormInput
							label="Location"
							type="text"
							name="location"
							value={formData.location}
							containerClass="mb-3"
							onChange={handleChange}
						/>

						<h4 className="header-title">Personal Details</h4>
						<FormInput
							label="First Name"
							type="text"
							name="firstName"
							value={formData.firstName}
							containerClass="mb-3"
							onChange={handleChange}
						/>
						<FormInput
							label="Surname"
							type="text"
							value={formData.surName}
							name="surName"
							containerClass="mb-3"
							onChange={handleChange}
						/>
						<FormInput
							label="Address"
							type="text"
							name="address"
							value={formData.address}
							containerClass="mb-3"
							onChange={handleChange}
						/>
						<FormInput
							label="Phone Number"
							type="text"
							name="number"
							value={formData.number}
							containerClass="mb-3"
							onChange={handleChange}
						/>
						<FormInput
							label="Date of Birth"
							type="date"
							name="dateOfBirth"
							value={formData.dateOfBirth}
							containerClass="mb-3"
							onChange={handleChange}
						/>
						<FormInput
							label="Gender"
							type="select"
							name="gender"
							containerClass="mb-3"
							value={formData.gender}
							className="form-select"
							onChange={handleChange}>
							<option value="male">Male</option>
							<option value="female">Female</option>
							<option value="other">Other</option>
						</FormInput>
						<FormInput
							label="Civil Status"
							type="select"
							name="civilStatus"
							value={formData.civilStatus}
							containerClass="mb-3"
							className="form-select"
							onChange={handleChange}>
							<option value="single">Single</option>
							<option value="married">Married</option>
							<option value="divorced">Divorced</option>
							<option value="widowed">Widowed</option>
						</FormInput>
						<h4 className="header-title">Uploads</h4>
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
								name="file"
								containerClass="mb-3"
								onChange={handleImageChange}
							/>
							<Button className="mb-3" onClick={handleImageUpload}>
								Upload Pic
							</Button>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="light" onClick={onSubmit}>
							Close
						</Button>
						<Button onClick={onSubmit}>Save changes</Button>
					</Modal.Footer>
				</Modal>
			</div>
		</>
	)
}
