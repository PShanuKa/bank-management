import { FormInput, PageBreadcrumb } from '@/components'
import PaginationWithStates from '@/components/Pagination'
import { useSearchCustomerQuery } from '@/features/api/customerSlice'
import { useGetAllEmployeesQuery } from '@/features/api/employeeSlice'
import {
	useCreateUserTaskMutation,
	useDeleteUserTaskMutation,
	useGetAllUserTaskQuery,
	useUpdateUserTaskMutation,
} from '@/features/api/userTaskSlice'
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
export default index

const StripedRows = () => {
	const [statusFilter, setStatusFilter] = useState('')
	const [page, setPage] = useState(1)
	const limit = 20
	const { data, isLoading: loading } = useGetAllUserTaskQuery({
		search: statusFilter,
		page,
		limit,
	})
	const { data: employees } = useGetAllEmployeesQuery({
		page: 1,
		limit: 1000000,
	})

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
									<option key={idx} value={record?._id}>
										{record?.firstName} {record?.surName}
									</option>
								)
							})}
						</FormInput>
					</div>
					<div className="table-responsive-sm">
						<Table className="table-striped table-centered mb-0">
							<thead>
								<tr>
									<th>Customer Code</th>
									<th>Customer Name</th>
									<th>Area</th>
									<th>Amount</th>
									<th>Collecting Date</th>
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
														&nbsp;{record?.customerCode?.customerCode}
													</td>
													<td className="table-user">
														&nbsp;{record?.customerCode?.firstName}
														&nbsp;{record?.customerCode?.surName}
													</td>

													<td className="table-user">
														&nbsp;{record?.customerCode?.areaCode?.name}
													</td>
													<td className="table-user">{record?.amount || 0}</td>
													<td className="table-user">
														{record?.date?.split('T')[0]}&nbsp;
													</td>
													<td className="table-user">{record?.status}</td>

													<td className="d-flex gap-3">
														<ModalSizes data={record} type="edit">
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

	const [cCode, setCCode] = useState<string>('')
	const [customerData, setCustomerData] = useState<any>()
	const { data: Customer } = useSearchCustomerQuery(cCode)

	const [formData, setFormData] = useState<any>({
		userId: '',
		amount: 0,
		customerCode: '',
		date: '',

		description: '',
	})

	useEffect(() => {
		if (Customer) {
			setCustomerData(Customer?.customers?.[0] || '')
			setFormData((prevData: any) => ({
				...prevData,
				customerCode: Customer?.customers?.[0]._id || '',
			}))
		}
	}, [Customer])

	useEffect(() => {
		if (type === 'edit') {
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
	}, [data, type])

	const { data: employees } = useGetAllEmployeesQuery({
		page: 1,
		limit: 1000000,
	})

	const [createTask] = useCreateUserTaskMutation()
	const [updateTask] = useUpdateUserTaskMutation()
	const [deleteTask] = useDeleteUserTaskMutation()

	const onSubmit = async () => {
		try {
			let response
			if (type === 'edit') {
				response = await updateTask({ formData, id: data._id }).unwrap()
			} else {
				response = await createTask(formData).unwrap()
				setFormData({
					userId: '',
					amount: 0,
					customerCode: '',
					date: '',
				})
				setCCode('')
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
			const response = await deleteTask(data?._id).unwrap()
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
							{customerData && (
								<>
									<h5>Customer Details</h5>
									<p>
										Name: {customerData?.firstName} {customerData?.surName}
									</p>
									{customerData?.nic && <p>Nic: {customerData?.nic}</p>}
								</>
							)}

							<FormInput
								label="Customer Code"
								type="text"
								name="address"
								value={cCode}
								onChange={(e) => {
									setCCode(e.target.value)
								}}
								containerClass="mb-3"
								className=""
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
							<Button variant="danger" onClick={deleteTaskHandler}>
								Delete
							</Button>
						)}
						<Button onClick={onSubmit}>Save changes</Button>
					</Modal.Footer>
				</Modal>
			</div>
		</>
	)
}
