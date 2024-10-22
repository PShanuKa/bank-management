
import { FormInput, PageBreadcrumb } from '@/components'
import PaginationWithStates from '@/components/Pagination'
import { useAreaCreateMutation, useAreaUpdateMutation, useGetAllAreasQuery } from '@/features/api/areaSlice'
import { useGetAllEmployeesQuery } from '@/features/api/employeeSlice'
import { useModal } from '@/hooks'
import { toast } from 'material-react-toastify'
import { useEffect, useState } from 'react'

import { Button, Card, Modal, Placeholder, Spinner, Table } from 'react-bootstrap'

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
	const [page, setPage] = useState(1)
	const limit = 20


	


	const {data, isLoading: loading} = useGetAllAreasQuery({page, limit})






	const handlePageChange = (page: number) => {
		setPage(page)
	}

	return (
		<>
			<Card>
				<Card.Header className="d-flex justify-content-between">
					<h4 className="header-title">Area Master</h4>
					<ModalSizes>
						<Button variant="info">Add New Area</Button>
					</ModalSizes>
				</Card.Header>
				<Card.Body>
					<div className="table-responsive-sm">
						<Table className="table-striped table-centered mb-0">
							<thead>
								<tr>
									<th>Area Name</th>
									{/* <th>Area Code</th> */}
									<th>Employee</th>
									<th>Collecting Date</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody>
								{!loading
									? (data?.areas || []).map((record: any, idx: any) => {
											return (
												<tr key={idx}>
													<td className="table-user">&nbsp;{record.name}</td>
													{/* <td>{record.code}</td> */}
													<td>
														{record.employeeId
															? record.employeeId.firstName
															: ''}
														&nbsp;
														{record.employeeId ? record.employeeId.surName : ''}{' '}
													</td>
															<td>{record.date}</td>
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
	
	
	const [createArea , {isLoading: createLoading}] = useAreaCreateMutation()
	const [updateArea , {isLoading: updateLoading}] = useAreaUpdateMutation()
	
	const [formData, setFormData] = useState<any>({
		name: '',
		date: '',
		employeeId: '',
	})
	

	useEffect(() => {
		if (type === 'edit') {
			setFormData({
				name: data.name,
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

	const [page] = useState(1)
	const limit = 10000

	const { data:userData } = useGetAllEmployeesQuery({ page, limit })
	

	const onSubmit = async () => {
		try {
			let response 
			if(type === 'edit'){
				response = await updateArea({formData, id: data._id}).unwrap()
			}else {
				response = await createArea(formData).unwrap()
				setFormData({
					name: '',
					date: '',
					employeeId: '',
				})
			}
			toast.success(response.message)
			toggleModal()
		} catch (err:any) {
			if(err.status === 400 || err.status === 401) {
				toast.error(err.data.message)
			}else if (err.status === 500) {
				console.log(err)
			}else{
				console.log(err)
				toast.error("Something went wrong")
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
						<h4 className="modal-title">Add New Area</h4>
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
								value={formData?.employeeId?._id}
								onChange={handleChange}>
								<option defaultValue={''} value={''}>Select..</option>

								{(userData?.users || []).map((record: any, idx: number) => (
									<option key={idx} value={record._id}>
										{record.firstName}
									</option>
								))}
							</FormInput>
						</form>
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
