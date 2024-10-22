import { FormInput, PageBreadcrumb } from '@/components'
import PaginationWithStates from '@/components/Pagination'
import { useGetAllAreasQuery } from '@/features/api/areaSlice'
import {
	useCreateCustomerMutation,
	useGetAllCustomersQuery,
	useUpdateCustomerMutation,
} from '@/features/api/customerSlice'
import { useUploadImageMutation } from '@/features/api/uploadSlice'
import { useModal } from '@/hooks'

import { toast } from 'material-react-toastify'
import { useEffect, useState } from 'react'

import {
	Button,
	Card,
	Image,
	Modal,
	Placeholder,
	Spinner,
	Table,
} from 'react-bootstrap'

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
	const [page, setPage] = useState(1)
	const limit = 20

	const { data, isLoading: loading } = useGetAllCustomersQuery({ page, limit })


	const handlePageChange = (page: number) => {
		setPage(page)
	}

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
									<th>Code</th>
									<th>Nic</th>
									<th>Location</th>
									<th>Number</th>
									<th>Gender</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody>
								{!loading
									? (data?.customers || []).map((record: any, idx: number) => {
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
													<td>{record.customerCode}</td>
													<td>{record.nic}</td>
													<td>{record.location}</td>
													<td>{record.number}</td>
													<td>{record.gender}</td>
													<td >
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
						{data?.totalPages > 1 && (	
						<PaginationWithStates
							pages={data?.totalPages}
							handlePageChange={handlePageChange}
						/>
						)}
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

	const [uploadImage] = useUploadImageMutation()
	const [imageLoading, setImageLoading] = useState<any>({
		profilePicture: false,
		homeImage: false,
		billImage: false,
		paySheetImage: false,
		signatureImage: false,
	})

	const [formData, setFormData] = useState({
		customerCode: '',
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
				nic: data.nic,
				customerCode: data.customerCode,
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
	}, [])
	const { data: areaData } = useGetAllAreasQuery({ page: 1, limit: 100000 })

	const handleImageChange = async (e: any) => {
		setImageLoading((prev: any) => ({
			...prev,
			[e.target.name]: true,
		}))
		const formData = new FormData()
		formData.append('file', e.target.files[0])
		formData.append(
			'upload_preset',
			import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
		)
		try {
			const response = await uploadImage(formData).unwrap()
			setFormData((prevData: any) => ({
				...prevData,
				[e.target.name]: response.secure_url,
			}))
		} catch (error) {
			toast.error('Error uploading image')
			console.error('Error uploading image:', error)
		}
		setImageLoading((prev: any) => ({
			...prev,
			[e.target.name]: false,
		}))
	}

	const handleChange = (e: any) => {
		const { name, value, type, files } = e.target
		setFormData((prevData: any) => ({
			...prevData,
			[name]: type === 'file' ? files[0] : value,
		}))
	}

	const GenerateCode = () => {
		const code = `C${Math.floor(Math.random() * 10000000)}`
		setFormData((prevData: any) => ({
			...prevData,
			customerCode: code,
		}))
	}
	const [createCustomer, { isLoading : createLoading}] = useCreateCustomerMutation()
	const [updateCustomer , { isLoading : updateLoading}] = useUpdateCustomerMutation()

	const onSubmit = async () => {
		try {
			let response
			if (type === 'edit') {
				response = await updateCustomer({ formData, id: data._id }).unwrap()
			} else {
				response = await createCustomer(formData).unwrap()
				setFormData({
					customerCode: '',
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
			}
			toast.success(response.message)

			toggleModal()
		} catch (err: any) {
			if (err.status === 409 || err.status === 404 || err.status === 400 || err.status === 401) {
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
						<h4 className="modal-title">Customer Master</h4>
					</Modal.Header>
					<Modal.Body>
						<FormInput
							label="Customer Code"
							type="text"
							name="customerCode"
							containerClass="mb-3"
							value={formData.customerCode}
							onChange={handleChange}
							disabled = {type === 'edit'}
						/>
						{(type === 'edit') || <Button onClick={GenerateCode} className="mb-3">
							Generate Code
						</Button>}
						
						
						<FormInput
							label="NIC Number"
							type="text"
							name="nic"
							value={formData.nic}
							containerClass="mb-3"
							onChange={handleChange}
						/>
						<FormInput
							name="areaCode"
							label="Area"
							type="select"
							value={formData.areaCode}
							containerClass="mb-3"
							className="form-select"
							onChange={handleChange}>
							<option value="">Select Location</option>
							{(areaData?.areas || []).map((area: any) => (
								<option key={area._id} value={area._id}>
									{area.name}
								</option>
							))}
						</FormInput>

						<FormInput
							name="location"
							label="Location"
							value={formData.location}
							containerClass="mb-3"
							onChange={handleChange}></FormInput>

						<h4 className="header-title">Personal Details</h4>
						{formData.profilePicture && (
							<Image
								src={formData.profilePicture}
								alt="avatar"
								style={{ width: '300px',  }}
								className="img-fluid  rounded"
							/>
						)}
						{imageLoading.profilePicture && <Spinner className="m-2" />}
						<FormInput
							label="Profile Picture"
							type="file"
							name="profilePicture"
							containerClass="mb-3"
							onChange={handleImageChange}
						/>

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
								<option defaultValue="" value={''}>Select ...</option>
							<option  value={'male'}>
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
								<option defaultValue="" value={''}>Select ...</option>
							<option  value={'single'}>
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
								<option defaultValue="" value={''}>Select ...</option>
							<option value={'0-20000'} >
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
								<option defaultValue="" value={''}>Select ...</option>
							<option value={'0-50000'} >
								0-50000
							</option>
							<option value={'50000-100000'}>50000-100000</option>
							<option value={'above 100000'}>above 100000</option>
						</FormInput>
						<p>Home Image</p>
						{imageLoading.homeImage && <Spinner className="m-2" />}
						{formData.homeImage && (
							<Image
								src={formData.homeImage}
								alt="avatar"
								style={{ width: '300px',  }}
								className="img-fluid   rounded"
							/>
						)}
						<FormInput
							type="file"
							name="homeImage"
							containerClass="mb-3"
							onChange={handleImageChange}
						/>

						<p>Bill Image</p>
						{imageLoading.billImage && <Spinner className="m-2" />}
						{formData.billImage && (
							<Image
								src={formData.billImage}
								alt="avatar"
								style={{ width: '300px',  }}
								className="img-fluid  w-full rounded"
							/>
						)}
						<FormInput
							type="file"
							name="billImage"
							containerClass="mb-3"
							onChange={handleImageChange}
						/>

						<p>Pay Sheet</p>
						{imageLoading.paySheetImage && <Spinner className="m-2" />}
						{formData.paySheetImage && (
							<Image
								src={formData.paySheetImage}
								alt="avatar"
								style={{ width: '300px',  }}
								className="img-fluid  rounded"
							/>
						)}
						<FormInput
							type="file"
							name="paySheetImage"
							containerClass="mb-3"
							onChange={handleImageChange}
						/>

						<p>Signature</p>
						{imageLoading.signatureImage && <Spinner className="m-2" />}
						{formData.signatureImage && (
							<Image
								src={formData.signatureImage}
								alt="avatar"
								style={{ width: '300px',  }}
								className="img-fluid  rounded"
							/>
						)}
						<FormInput
							type="file"
							name="signatureImage"
							containerClass="mb-3"
							onChange={handleImageChange}
						/>
					</Modal.Body>

					<Modal.Footer>
						<Button variant="light" onClick={toggleModal}>
							Close
						</Button>{' '}
						<Button onClick={onSubmit}>{(createLoading || updateLoading) && <Spinner size='sm' className='me-2' /> }Save changes</Button>
					</Modal.Footer>
				</Modal>
			</div>
		</>
	)
}
