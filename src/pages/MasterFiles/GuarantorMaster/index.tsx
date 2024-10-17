import { FormInput, PageBreadcrumb } from '@/components'
import { useCreateGuarantorMutation, useGetAllGuarantorsQuery, useUpdateGuarantorMutation } from '@/features/api/guarantorSlice'
import { useUploadImageMutation } from '@/features/api/uploadSlice'
import { useModal } from '@/hooks'
import { toast } from 'material-react-toastify'
import { useEffect, useState } from 'react'
import { Button, Card, Image, Modal, Placeholder, Spinner, Table } from 'react-bootstrap'

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
	

	const [page] = useState(1)
	const limit = 10000

	const { data, isLoading: loading } = useGetAllGuarantorsQuery({ page, limit })

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
									<th>Code</th>
									<th>Nic Number</th>
									<th>Location</th>
									<th>Gender</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody>
								{!loading
									? (data?.guarantors || []).map((record: any, idx: number) => {
											return (
												<tr key={idx}>
													<td className="table-user">
														{record.profilePicture && (
															<img
																src={record.profilePicture}
																alt="table-user"
																className="me-2 rounded-circle"
															/>
														)}
														&nbsp;{record.firstName}&nbsp;{record.surName}
													</td>
													<td>{record.guarantorCode}</td>
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
	// const [imageLoading, setImageLoading] = useState<Boolean>(false)

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
		guarantorCode: ''
	})

	const GenerateCode = () => {
		const code = `G${Math.floor(Math.random() * 10000000)}`
		setFormData((prevData: any) => ({
			...prevData,
			guarantorCode: code,
		}))
	}

	const [uploadImage, {isLoading:imageLoading} ] = useUploadImageMutation()


	const handleImageChange = async (e: any) => {
		
		const formData = new FormData()
		formData.append('file', e.target.files[0])
		formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET)
		try {
			const response = await uploadImage(formData).unwrap()
			setFormData((prevData: any) => ({
				...prevData,
				profilePicture: response.secure_url,
			}))
		} catch (error) {
			toast.error('Error uploading image')
			console.error('Error uploading image:', error)
		}
		
	}

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
				guarantorCode: data.guarantorCode
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


	const [createGuarantor] = useCreateGuarantorMutation()
	const [updateGuarantor] = useUpdateGuarantorMutation()
	const onSubmit = async () => {
		try {
			let response
			if (type === 'edit') {
				response = await updateGuarantor({ formData, id: data._id }).unwrap()
			} else {
				response = await createGuarantor(formData).unwrap()
				setFormData({
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
					guarantorCode: ''
				})
			}
			toast.success(response.message)
			toggleModal()
		} catch (err: any) {
			if (err.status === 409 || err.status === 404 || err.status === 400) {
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
							label="Customer Code"
							type="text"
							name="guarantorCode"
							containerClass="mb-3"
							value={formData.guarantorCode}
							onChange={handleChange}
							disabled = {type === 'edit'}
						/>
						{type === 'edit' || <Button onClick={GenerateCode} className='mb-3'>Generate Code</Button>}
						
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
								<option value="">Select ...</option>
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
								<option value="">Select ...</option>
							<option value="single">Single</option>
							<option value="married">Married</option>
							<option value="divorced">Divorced</option>
							<option value="widowed">Widowed</option>
						</FormInput>
						<h4 className="header-title">Uploads</h4>
						<h5>Profile Picture</h5>
							{imageLoading && <Spinner className="m-2" />}
							{formData.profilePicture && (
								<Image
									src={formData.profilePicture}
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
