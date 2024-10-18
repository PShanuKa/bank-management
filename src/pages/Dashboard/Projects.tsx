import { Button, Modal, Table } from 'react-bootstrap'

// components
import { CustomCardPortlet, FormInput } from '@/components'

// data
import { useEffect, useState } from 'react'
import {
	useGetAllUserTaskQuery,
	useSubmitUserTaskMutation,
} from '@/features/api/userTaskSlice'
import { toast } from 'material-react-toastify'

import { useModal } from '@/hooks'
import { useSelector } from 'react-redux'

const Projects = () => {
	const userId =useSelector((state: any) => state?.auth?.userInfo)
	const [statusFilter , setStatusFilter] = useState('')
	const [page] = useState(1)
	const limit = 10000
	const { data } = useGetAllUserTaskQuery({ search: statusFilter, page, limit })
	
	useEffect(() => {
		if(!userId.isAdmin){
			setStatusFilter(userId._id)
		}
	},[userId])


	return (
		<CustomCardPortlet cardTitle="Collection Report" titleClass="header-title">
			<Table hover responsive className="table-nowrap mb-0">
				<thead>
					<tr>
						<th>Customer Name</th>
						<th>Collecting Date</th>
						<th>Area</th>
						<th>Amount</th>
						<th>Status</th>
						<th className="text-center">Action</th>
					</tr>
				</thead>
				<tbody>
					{(data?.userTask || []).map((data: any, idx: any) => {
						return (
							<tr key={idx}>
								<td>{data?.customerName}</td>
								<td>{data?.date.split('T')[0]}</td>

								<td>{data?.areaId?.name}</td>
								<td>{data?.amount || 0}</td>
								<td>
									<span
										className={`badge bg-${
											data?.status === 'completed' ? 'success' : 'danger'
										}-subtle text-${
											data?.status === 'completed' ? 'success' : 'danger'
										}`}>
										{data?.status}
									</span>
								</td>
								<td align="center">
									<ModalSizes data={data}>
										<i className="ri-check-line" />
									</ModalSizes>
								</td>
							</tr>
						)
					})}
				</tbody>
			</Table>
		</CustomCardPortlet>
	)
}

export default Projects

const ModalSizes = ({ children, data }: { children: any; data?: any }) => {
	const { isOpen, size, className, scroll, toggleModal, openModalWithSize } =
		useModal()

	const [formData, setFormData] = useState<any>({
		statusDescription: '',
	})

	useEffect(() => {
		setFormData({ statusDescription: data.statusDescription })
	}, [data])

	const [submitTask] = useSubmitUserTaskMutation()

	const onSubmit = async () => {
		try {
			let response
			response = await submitTask({ formData, id: data._id }).unwrap()
			toast.success(response.message)
			toggleModal()
		} catch (err: any) {
			if (err.status === 400) {
				toast.error(err.data.message)
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
						<Modal.Title>Task Details</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<div>
							<h5 className="mt-4 fs-17 text-dark">Loan Information</h5>
							<table
								
								className="table table-condensed mb-0 border-top">
								<tbody>
									<tr>
										<th scope="row">Customer Name</th>
										<td className="ng-binding">
											<p className="ng-binding text-end ">
												{data?.customerName}
											</p>
										</td>
									</tr>
									<tr>
										<th scope="row">Area</th>
										<td className="ng-binding">
											<p className="ng-binding text-end ">
												{data?.areaId?.name}
											</p>
										</td>
									</tr>
									<tr>
										<th scope="row">Loan Status</th>
										<td>
											<p className="ng-binding text-end">{data?.status}</p>
										</td>
									</tr>
									<tr>
										<th scope="row">Collecting Date</th>
										<td className="ng-binding text-end">
											{data?.date.split('T')[0]}
										</td>
									</tr>
									<tr>
										<th scope="row">Address</th>
										<td className="ng-binding text-end">{data?.address}</td>
									</tr>
									<tr>
										<th scope="row">Amount</th>
										<td>
											<p className="ng-binding text-end">
												Rs {data?.amount || 0}
											</p>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
						<form className="mt-3">
							<FormInput
								label="Description"
								type="textarea"
								name="description"
								value={formData.statusDescription}
								onChange={(e) => {
									setFormData({
										...formData,
										statusDescription: e.target.value,
									})
								}}
								containerClass="mb-3"
							/>
						</form>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="light" onClick={toggleModal}>
							Close
						</Button>{' '}
						{data.status === 'pending' && (
							<Button onClick={onSubmit}>Collect</Button>
						)}
					</Modal.Footer>
				</Modal>
			</div>
		</>
	)
}
