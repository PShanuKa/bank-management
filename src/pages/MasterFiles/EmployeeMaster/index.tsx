import { FormInput, PageBreadcrumb } from '@/components'
import { useModal } from '@/hooks'

import {
	Button,
	Card,
	Image,
	Modal,
	Placeholder,
	Spinner,
	Table,
} from 'react-bootstrap'

import { useEffect, useState } from 'react'
import { toast } from 'material-react-toastify'
import {
	useCreateEmployeeMutation,
	useGetAllEmployeesQuery,
	useUpdateEmployeeMutation,
} from '@/features/api/employeeSlice'
import { useUploadImageMutation } from '@/features/api/uploadSlice'

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
	const [page] = useState(1)
	const limit = 10000

	const { data, isLoading: loading } = useGetAllEmployeesQuery({ page, limit })
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
								{loading
									? [...Array(4)].map((_, i) => (
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
									  ))
									: (data?.users || [])?.map((record: any, idx: number) => {
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
	const [createEmployee] = useCreateEmployeeMutation()
	const [updateEmployee] = useUpdateEmployeeMutation()
	const [uploadImage, { isLoading: imageLoading }] = useUploadImageMutation();

	// const [imageLoading, setImageLoading] = useState<Boolean>(false)
	// State to store form data
	const [formData, setFormData] = useState<any>({
		
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
		isAdmin: false,
	})

	const handleImageChange = async (e: any) => {
		const formData = new FormData()
		formData.append('file', e.target.files[0])
		formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET)
		try {
			const response = await uploadImage(formData).unwrap()
			setFormData((prevData: any) => ({ ...prevData, [e.target.name]: response.secure_url }))
			
		} catch (error) {
			toast.error('Error uploading image')
			console.error('Error uploading image:', error)
		}
	}

	useEffect(() => {
		if (type === 'edit') {
			setFormData({
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
				isAdmin: data.isAdmin,
			})
		}
	}, [])

	const handleChange = (e: any) => {
		const { name, value, type, files } = e.target

		setFormData((prevData: any) => ({
			...prevData,
			[name]: type === 'file' ? files[0] : value,
		}))
	}

	const onSubmit = async () => {
		try {
			let response
			if (type === 'edit') {
				response = await updateEmployee({ formData, id: data._id }).unwrap()
			} else {
				response = await createEmployee(formData).unwrap()
				setFormData({
					designation: '',
					location: '',
					profilePicture: '',
					firstName: '',
					surName: '',
					email: '',
					password: '',
					isAdmin: false,
					nic: '',
					gender: '',
					dateOfBirth: '',
					mobileNumber: '',
					address: '',
					civilStatus: '',
				})
			}
			toast.success(response.message)
			toggleModal()
		} catch (err: any) {
			if (err.status === 409 || err.status === 404) {
				toast.error(err.data.message)
			} else {
				console.error(err)
				toast.error('something went wrong')
			}
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
								value={String(formData.isAdmin)}
								onChange={(e)=> setFormData((prevData: any) => ({ ...prevData, isAdmin: (e.target.value === 'true' ? true : false) }))}>
								<option defaultValue="">Select ...</option>
								<option value='false' >Employee</option>
								<option value='true'>Admin</option>
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
							<h5>Profile Picture</h5>
							{imageLoading ? <Spinner className="m-2" /> : 
								formData.profilePicture && (
									<Image
									src={formData.profilePicture}
									alt="avatar"
									className="img-fluid avatar-lg rounded"
									/>
								)
							}
							<FormInput
								type="file"
								accept="image/*"
								name="profilePicture"
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
