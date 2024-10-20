import { FormInput, PageBreadcrumb } from '@/components'
import PaginationWithStates from '@/components/Pagination'
import { useGetAllAreasQuery } from '@/features/api/areaSlice'
import { useGetAllEmployeesQuery } from '@/features/api/employeeSlice'
import { useCreateUserTaskMutation, useDeleteUserTaskMutation, useGetAllUserTaskQuery, useUpdateUserTaskMutation } from '@/features/api/userTaskSlice'
import { useModal } from '@/hooks'
import { toast } from 'material-react-toastify'
import { useEffect, useState } from 'react'
import { Button, Card, Modal, Placeholder, Table } from 'react-bootstrap'



const index = () => {
	return (
		<>
			<PageBreadcrumb title="Collection Report" subName="Report" />
			<StripedRows />
		</>
	)
}
export default index;

const StripedRows = () => {
	const [statusFilter, setStatusFilter] = useState('')
	const [page , setPage] = useState(1)
	const limit = 20
	const { data, isLoading: loading } = useGetAllUserTaskQuery({search : statusFilter, page, limit })
	const { data : employees } = useGetAllEmployeesQuery({ page: 1, limit: 1000000 })


	const handlePageChange = (page: number) => {
		setPage(page)
	}

	return (
		<>
			<Card>
				<Card.Header className="d-flex justify-content-between">
					<h4 className="header-title">User Dashboard</h4>
					<ModalSizes>
						<Button variant="info">Assign Task</Button>
					</ModalSizes>
				</Card.Header>
				<Card.Body>
					<div style={{ maxWidth: '300px' }}>
						<FormInput
							label="Employee"
							type="select"
							name="areaId"
							onChange={(e) => setStatusFilter(e.target.value)}
							containerClass="mb-3"
							className="form-select">
							<option defaultValue={''} value={''}>
								All
							</option>
							{(employees?.users || []).map((record: any, idx: any) => {
								return (
									<option key={idx} value={record?._id}>{record?.firstName} {record?.surName}</option>
								)
							})}
						</FormInput>
					</div>
					<div className="table-responsive-sm">
						<Table className="table-striped table-centered mb-0">
							<thead>
								<tr>
									<th>Customer Name</th>
									<th>Collecting Date</th>
									<th>Area</th>
									<th>Amount</th>
									<th>Status</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody>
								{!loading
									? (data?.userTask || []).map((record: any, idx: any) => {
											return (
												<tr key={idx}>
													<td className="table-user">
														&nbsp;{record?.customerName}
													</td>
													<td className="table-user">
														{record?.date.split('T')[0]}&nbsp;
													</td>
													<td>
														{record?.areaId?.name}
													</td>
													
													<td className="table-user">{record?.amount || 0}</td>
													<td className="table-user">{record?.status}</td>

													<td className="d-flex gap-3">
														<ModalSizes data={record} type='edit'>
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

	const [formData, setFormData] = useState<any>({
		userId: '',
		amount: 0,
		address: '',
		customerName: '',
		date: '',
		areaId: '',
		description: '',
	})

	useEffect(() => {
		if(type === 'edit'){
			setFormData({
				userId: data?.userId?._id || '',
				amount: data?.amount || 0,
				address: data?.address || '',
				customerName: data?.customerName || '',
				date: data?.date || '',
				areaId: data?.areaId?._id || '',
				description: data?.description || '',
			})
		}
	},[data, type])

	const { data: employees } = useGetAllEmployeesQuery({
		page: 1,
		limit: 1000000,
	})

	const { data: areas } = useGetAllAreasQuery({ page: 1, limit: 1000000 })
	const [createTask] = useCreateUserTaskMutation()
	const [updateTask] = useUpdateUserTaskMutation()
	const [deleteTask] =useDeleteUserTaskMutation()

	const onSubmit = async () => {
		try {
			let response
			if (type === 'edit') {
				response = await updateTask({formData, id: data._id}).unwrap()
				
			} else {
				response = await createTask(formData).unwrap()
				setFormData({
					amount: 0,
					address: '',
					customerName: '',
					date: '',
					areaId: '',
					description: '',
				})
			}
			toast.success(response.message)
			toggleModal()
		} catch (err: any) {
			if (err.status === 400) {
				toast.error(err.data.message)
			} else if (err.status === 500) {
				console.log(err)
			} else {
				console.log(err)
				toast.error('Something went wrong')
			}
		}
	}

	const deleteTaskHandler = async () => {
		try {
			const response = await deleteTask( data?._id).unwrap()
			toast.success(response.message)
			toggleModal()
		} catch (err: any) {
			if (err.status === 400) {
				toast.error(err.data.message)
			} else if (err.status === 500) {
				console.log(err)
			} else {
				console.log(err)
				toast.error('Something went wrong')
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
						<Modal.Title>Add Collection</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<form>
							
							<FormInput
								label="Area"
								type="select"
								name="location"
								className="form-select"
								value={formData.areaId}
								onChange={(e) => {
									setFormData({ ...formData, areaId: e.target.value })
								}}
								containerClass="mb-3">
								<option defaultValue="">Select ...</option>
								{(areas?.areas || []).map((record: any, idx: any) => {
									return (
										<option key={idx} value={record?._id}>
											{record?.name}
										</option>
									)
								})}
							</FormInput>

							<FormInput
								label="Employee name"
								type="select"
								name="userId"
								className="form-select"
								value={formData.userId}
								onChange={(e) => {
									setFormData({ ...formData, userId: e.target.value })
									console.log(e.target.value)
								}}
								containerClass="mb-3">
								<option value={''}>Select ...</option>
								{(employees?.users || []).map((record: any, idx: any) => {
									return (
										<option key={idx} value={record?._id}>
											{record?.firstName} {record?.surName}
										</option>
									)
								})}
							</FormInput>
							<FormInput
								label="Customer name"
								type="text"
								name="address"
								value={formData.customerName}
								onChange={(e) => {
									setFormData({ ...formData, customerName: e.target.value })
								}}
								containerClass="mb-3"
							/>
							<FormInput
								label="Customer Address"
								type="text"
								name="address"
								value={formData.address}
								onChange={(e) => {
									setFormData({ ...formData, address: e.target.value })
								}}
								containerClass="mb-3"
							/>
							<FormInput
								label="Collating Amount"
								type="number"
								name="collatingAmount"
								value={formData.amount}
								onChange={(e) => {
									setFormData({ ...formData, amount: e.target.value })
								}}
								containerClass="mb-3"
							/>
							<FormInput
								label="Collating Amount"
								type="date"
								name="collatingAmount"
								value={String(formData.date).split('T')[0]}
								onChange={(e) => {
									setFormData({ ...formData, date: e.target.value })
								}}
								containerClass="mb-3"
							/>
							<FormInput
								label="Description"
								type="textarea"
								name="description"
								value={formData.description}
								onChange={(e) => {
									setFormData({ ...formData, description: e.target.value })
								}}
								containerClass="mb-3"
							/>
						</form>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="light" onClick={toggleModal}>
							Close
						</Button>{' '}
						{type === 'edit' && (
							<Button variant='danger' onClick={deleteTaskHandler}>Delete</Button>
						)}
						<Button onClick={onSubmit}>Save changes</Button>
					</Modal.Footer>
				</Modal>
			</div>
		</>
	)
}
