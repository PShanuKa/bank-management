import { useAuth } from '@/common'
import { FormInput, PageBreadcrumb } from '@/components'
import { useModal } from '@/hooks'

import axios from 'axios'
import { useEffect, useState } from 'react'

import { Button, Card, Image, Modal, Table } from 'react-bootstrap'


const index = () => {
	return (
		<>
			<PageBreadcrumb title="Customer Master" subName="Master Files" />
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
					'http://localhost:3000/api/customer/all-customers',
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
					<h4 className="header-title">Customer Master</h4>
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
									<th>Loan Code</th>
									<th>Gender</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody>
								{(data || []).map((record: any, idx: number) => {
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
											<td>{record.nic}</td>
											<td>{record.location}</td>
											<td>{record.loanCode}</td>
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
	const [images, setImage] = useState<any>({
		profilePictureFile: null,
		homeImageFile: null,
		billImageFile: null,
		paySheetImageFile: null,
		signatureImageFile: null,
	})
	const handleImageChange = (e: any) => {
		setImage({
			...images,
			[e.target.name]: e.target.files[0],
		})
		console.log('images', images)
		
	}
	const [formData, setFormData] = useState({
		loanCode: '',
		nic: '',
		location: '',
		areaCode: '',
		firstName: '',
		surName: '',
		address: '',
		number: '',
		gender: '',
		dateOfBirth: '',
		civilStatus: '',
		income: '',
		homeFullIncome: '',
		profilePicture: '',
		homeImage: '',
		billImage: '',
		paySheetImage: '',
		signatureImage: '',
	})
	useEffect(() => {
		if (type === 'edit') {
			setFormData({
				loanCode: data.loanCode,
				nic: data.nic,
				location: data.location,
				areaCode: data.areaCode,
				firstName: data.firstName,
				surName: data.surName,
				address: data.address,
				number: data.number,
				gender: data.gender,
				dateOfBirth: data.dateOfBirth,
				civilStatus: data.civilStatus,
				income: data.income,
				homeFullIncome: data.homeFullIncome,
				profilePicture: data.profilePicture,
				homeImage: data.homeImage,
				billImage: data.billImage,
				paySheetImage: data.paySheetImage,
				signatureImage: data.signatureImage,
			})
		}
		console.log(data)
	}, [])

	const handleImageUpload = async ({ name }: { name: string }) => {
		const formData = new FormData()
		formData.append('file', images[name + 'File'])
		formData.append('upload_preset', 'tfrt1byi')
		try {
			const response = await axios.post(
				'https://api.cloudinary.com/v1_1/dldtrjalo/image/upload',
				formData
			)
			setFormData((prevData: any) => ({
				...prevData,
				[name]: response.data.secure_url,
			}))
		} catch (error) {
			console.error('Error uploading image:', error)
		}
	}

	const handleChange = (e: any) => {
		const { name, value, type, files } = e.target
		setFormData((prevData: any) => ({
			...prevData,
			[name]: type === 'file' ? files[0] : value,
		}))
		console.log(formData)
	}

	const onSubmit = async () => {
		try {
			await axios.post(
				`http://localhost:3000/api/${
					type === 'edit' ? `customer/update/${data._id}` : 'customer/create'
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
						<h4 className="modal-title">Area Master</h4>
					</Modal.Header>
					<Modal.Body>
						<FormInput
							label="Loan Code"
							type="text"
							name="loanCode"
							containerClass="mb-3"
							value={formData.loanCode}
							onChange={handleChange}
						/>
						<FormInput
							label="NIC Number"
							type="text"
							name="nic"
							value={formData.nic}
							containerClass="mb-3"
							onChange={handleChange}
						/>
						<FormInput
							name="location"
							label="Location"
							type="text"
							value={formData.location}
							containerClass="mb-3"
							
							onChange={handleChange}/>
							
						<FormInput
							label="Customer Code"
							value={formData.areaCode}
							name="Customer Code"
							containerClass="mb-3"
							onChange={handleChange}
						/>
						<FormInput
							name="areaCode"
							label="Area Code"
							value={formData.areaCode}
							containerClass="mb-3"
							
							onChange={handleChange}></FormInput>

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
							name="profilePictureFile"
							containerClass="mb-3"
							onChange={handleImageChange}
						/>
						<Button
							className="mb-3"
							onClick={() => handleImageUpload({ name: 'profilePicture' })}>
							Upload Pic
						</Button>

						<FormInput
							label="First Name"
							type="text"
							value={formData.firstName}
							name="firstName"
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
							containerClass="mb-3"
							onChange={handleChange}
						/>
						<FormInput
							name="gender"
							label="Gender"
							value={formData.gender}
							onChange={handleChange}
							type="select"
							containerClass="mb-3"
							className="form-select">
							<option defaultValue="selected" value={'male'}>
								Male
							</option>
							<option value={'female'}>Female</option>
							<option value={'other'}>Other</option>
						</FormInput>

						<FormInput
							label="Mobile Number"
							type="text"
							name="number"
							value={formData.number}
							containerClass="mb-3"
							onChange={handleChange}
						/>
						<FormInput
							label="Address"
							type="text"
							value={formData.address}
							onChange={handleChange}
							name="address"
							containerClass="mb-3"
						/>
						<FormInput
							name="civilStatus"
							label="Civil Status"
							type="select"
							value={formData.civilStatus}
							containerClass="mb-3"
							className="form-select"
							onChange={handleChange}>
							<option defaultValue="selected" value={'single'}>
								Single
							</option>
							<option value={'married'}>Married</option>
							<option value={'divorced'}>Divorced</option>
							<option value={'widowed'}>Widowed</option>
						</FormInput>
						<FormInput
							name="income"
							label="Income"
							type="select"
							value={formData.income}
							containerClass="mb-3"
							onChange={handleChange}
							className="form-select">
							<option value={'0-20000'} defaultValue="selected">
								0-20000
							</option>
							<option value={'20000-40000'}>20000-40000</option>
							<option value={'40000-60000'}>40000-60000</option>
							<option value={'60000-80000'}>60000-80000</option>
							<option value={'80000-100000'}>80000-100000</option>
							<option value={'above 100000'}>above 100000</option>
						</FormInput>
						<FormInput
							name="homeFullIncome"
							label="Home Income"
							type="select"
							value={formData.homeFullIncome}
							containerClass="mb-3"
							onChange={handleChange}
							className="form-select">
							<option value={'0-50000'} defaultValue="selected">
								0-50000
							</option>
							<option value={'50000-100000'}>50000-100000</option>
							<option value={'above 100000'}>above 100000</option>
						</FormInput>
						<p>Home Image</p>
						{formData.homeImage && (
							<Image
								src={formData.homeImage}
								alt="avatar"
								className="img-fluid avatar-lg  rounded"
							/>
						)}
						<FormInput	
							type="file"
							name="homeImageFile"
							containerClass="mb-3"
							onChange={handleImageChange}
						/>
						<Button
							className="mb-3"
							onClick={() => handleImageUpload({ name: 'homeImage' })}>
							Upload
						</Button>
						<p>Bill Image</p>
						{formData.billImage && (
							<Image
								src={formData.billImage}
								alt="avatar"
								className="img-fluid avatar-lg w-full rounded"
							/>
						)}
						<FormInput
							type="file"
							name="billImageFile"
							containerClass="mb-3"
							onChange={handleImageChange}
						/>
						<Button
							className="mb-3"
							onClick={() => handleImageUpload({ name: 'billImage' })}>
							Upload
						</Button>
						<p>Pay Sheet</p>
						{formData.paySheetImage && (
							<Image
								src={formData.paySheetImage}
								alt="avatar"
								className="img-fluid avatar-lg rounded"
							/>
						)}
						<FormInput
							
							type="file"
							name="paySheetImageFile"
							containerClass="mb-3"
							onChange={handleImageChange}
						/>
						<Button
							className="mb-3"
							onClick={() => handleImageUpload({ name: 'paySheetImage' })}>
							Upload
						</Button>
						<p>Signature</p>
						{formData.signatureImage && (
							<Image
								src={formData.signatureImage}
								alt="avatar"
								className="img-fluid avatar-lg rounded"
							/>
						)}
						<FormInput
							
							type="file"
							name="signatureImageFile"
							containerClass="mb-3"
							onChange={handleImageChange}
						/>
						<Button
							className="mb-3"
							onClick={() => handleImageUpload({ name: 'signatureImage' })}>
							Upload
						</Button>
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
