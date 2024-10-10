import { useAuth } from '@/common'
import { FormInput, PageBreadcrumb } from '@/components'
import { useModal } from '@/hooks'

import axios from 'axios'
import { toast } from 'material-react-toastify'
import { useEffect, useState } from 'react'

import { Button, Card, Modal, Table } from 'react-bootstrap'


const index = () => {
	return (
		<>
			<PageBreadcrumb title="Area Master" subName="Master Files" />
			<StripedRows />
		</>
	)
}

export default index

const StripedRows = () => {
	const [data, setData] = useState<any>([])

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					`${import.meta.env.VITE_API_URL}/area/all`,
					{
						headers: {
							Authorization: `Bearer YOUR_TOKEN_HERE`, 
						},
					}
				)
				setData(response.data)
			
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
					<h4 className="header-title">Area Master</h4>
					<ModalSizes>
						<Button variant="info">Add New Customer</Button>
					</ModalSizes>
				</Card.Header>
				<Card.Body>
					<div className="table-responsive-sm">
						<Table className="table-striped table-centered mb-0">
							<thead>
								<tr>
									<th>Area Name</th>
									<th>Area Code</th>
									<th>Collecting Date</th>
									<th>Employee</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody>
								{(data || []).map((record: any, idx:any) => {
									return (
										<tr key={idx}>
											<td className="table-user">
												
												&nbsp;{record.name}
											</td>
											<td>{record.code}</td>
											<td>{record.date}</td>
											<td>{record.employeeId ? record.employeeId.firstName :	''  }&nbsp;{record.employeeId ? record.employeeId.surName : ''} </td>
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
	const [userData, setUserData] = useState<any>([])
	const { token } = useAuth()

	const [formData, setFormData] = useState({
		name: '',
		code: '',
		date: '',
		employeeId: '',
	})

	useEffect(() => {
		if (type === 'edit') {
			setFormData({
				name: data.name,
				code: data.code,
				date: data.date,
				employeeId: data.employeeId,
			})
		}
		console.log(data)
	}, [])

	const handleChange = (e: any) => {
		const { name, value, type, files } = e.target
		setFormData((prevData: any) => ({
			...prevData,
			[name]: type === 'file' ? files[0] : value,
		}))
	}

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					`${import.meta.env.VITE_API_URL}/api/user/all-users`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				)
				setUserData(response.data)
			} catch (error) {
				console.error('Error fetching data:', error)
			}
		}
		fetchData()
	}, [])

	const onSubmit = async () => {
		try {
			await axios.post(
				`${import.meta.env.VITE_API_URL}/${
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
			
			toast.success(`Area ${type === 'edit' ? 'updated' : 'added'}`)
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
						<h4 className="modal-title">Add New Employee</h4>
					</Modal.Header>
					<Modal.Body>
						<form>
							<FormInput
								label="Area Name"
								type="text"
								name="name"
								value={formData.name}
								onChange={handleChange}
								containerClass="mb-3"
							/>
							<FormInput
								label="Area Code"
								type="text"
								name="code"
								value={formData.code}
								onChange={handleChange}
								containerClass="mb-3"
							/>
							{formData.date && (
								<h5>
									Collecting Date:{' '}
									{new Date(formData.date).toISOString().split('T')[0]}
								</h5>
							)}
							<FormInput
								label="Collecting Date"
								type="date"
								name="date"
								value={formData.date}
								onChange={handleChange}
								containerClass="mb-3"
							/>
							<FormInput
								name="employeeId"
								label="Employee"
								type="select"
								containerClass="mb-3"
								className="form-select"
								value={formData.employeeId}
								onChange={handleChange}>
								<option defaultValue={''}>Select..</option>
								
								{(userData || []).map((record: any , idx: number) => (
									<option key={idx} value={record._id}>{record.firstName}</option>
								))}
							</FormInput>
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
