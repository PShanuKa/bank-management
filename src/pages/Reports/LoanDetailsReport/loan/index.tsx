import { FormInput, PageBreadcrumb } from '@/components'
import {
	useCreatePaymentMutation,
	useDeletePaymentMutation,
	useGetPaymentQuery,
} from '@/features/api/paymentSlice'
import { useModal } from '@/hooks'
import { toast } from 'material-react-toastify'
import React, { useEffect, useState } from 'react'
import { Button, Card, Image, Modal, Spinner, Table } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import {
	useActionLoanMutation,
	useGetALoanQuery,
} from '@/features/api/loanSlice'
import {
	useCreateInstallmentMutation,
	useDeleteInstallmentMutation,
	useGetInstallmentQuery,
	useUpdateInstallmentMutation,
} from '@/features/api/installmentSlice'
import { useGetAAreasQuery } from '@/features/api/areaSlice'
import { useCreateUserTaskMutation } from '@/features/api/userTaskSlice'

const index = () => {
	const { id } = useParams()
	const { data } = useGetALoanQuery(id)
	return (
		<>
			<PageBreadcrumb title={`Loan`} subName="Report" />
			<Card>
				<Card.Body>
					<div>
						<h3>Loan Code: {data?.Loan?.loanCode}</h3>

						<h5 className="mt-4 fs-17 text-dark">Loan Information</h5>
						<table
							style={{ maxWidth: '600px' }}
							className="table table-condensed mb-0 border-top">
							<tbody>
								<tr>
									<th scope="row">Location</th>
									<td className="ng-binding">
										<p className="ng-binding text-end ">
											{data?.Loan?.location}
										</p>
									</td>
								</tr>
								<tr>
									<th scope="row">Loan Status</th>
									<td>
										<p className="ng-binding text-end">{data?.Loan?.status}</p>
									</td>
								</tr>
								<tr>
									<th scope="row">Start Date</th>
									<td className="ng-binding text-end">
										{data?.Loan?.startDate}
									</td>
								</tr>
								<tr>
									<th scope="row">End Date</th>
									<td>
										<p className="ng-binding text-end">
											{String(data?.Loan?.endDate).split('T')[0]}
										</p>
									</td>
								</tr>
								{data?.Loan?.reminderDescription && (
									<tr>
										<th scope="row">Reminder Description</th>
										<td>
											<p className="ng-binding text-end">
												{data?.Loan?.reminderDescription}
											</p>
										</td>
									</tr>
								)}
							</tbody>
						</table>

						<h5 className="mt-4 fs-17 text-dark">Collecting Information</h5>
						<table
							style={{ maxWidth: '600px' }}
							className="table table-condensed mb-0 border-top">
							<tbody>
								<tr>
									<th scope="row">Week</th>
									<td className="ng-binding">
										<p className="ng-binding text-end ">
											{data?.Loan?.collectWeek}
										</p>
									</td>
								</tr>
								<tr>
									<th scope="row">Day</th>
									<td>
										<p className="ng-binding text-end">
											{data?.Loan?.collectDay}
										</p>
									</td>
								</tr>
							</tbody>
						</table>

						<h5 className="mt-4 fs-17 text-dark">Amount Information</h5>
						<table
							style={{ maxWidth: '600px' }}
							className="table table-condensed mb-0 border-top">
							<tbody>
								<tr>
									<th scope="row">Loan Amount</th>
									<td className="ng-binding">
										<p className="ng-binding text-dark text-end">
											{data?.Loan?.loanAmount}
										</p>
									</td>
								</tr>
								<tr>
									<th scope="row">Interest Rate</th>
									<td>
										<p className="ng-binding text-end">
											{data?.Loan?.interestRate}%
										</p>
									</td>
								</tr>
								<tr>
									<th scope="row">Total Amount</th>
									<td className="ng-binding text-dark text-end">
										{(Number(data?.Loan?.loanAmount) *
											Number(data?.Loan?.interestRate)) /
											100 +
											Number(data?.Loan?.loanAmount)}
									</td>
								</tr>
								<tr>
									<th scope="row"># Of Installments</th>
									<td>
										<p className="ng-binding text-end">
											{data?.Loan?.ofInstallments || 0}
										</p>
									</td>
								</tr>
								<tr>
									<th scope="row">Amount Per Installment:</th>
									<td>
										<p className="ng-binding text-dark text-end">
											{(
												((Number(data?.Loan?.loanAmount) *
													Number(data?.Loan?.interestRate)) /
													100 +
													Number(data?.Loan?.loanAmount)) /
												Number(data?.Loan?.ofInstallments || 0)
											).toFixed(2)}
										</p>
									</td>
								</tr>
							</tbody>
						</table>
						{data?.Loan?.customerCode && (
							<>
								<h5 className="mt-4 fs-17 text-dark">Customer Information</h5>
								<Image
									style={{ width: '200px' }}
									src={data?.Loan?.customerCode?.profilePicture}
									alt=""
								/>
								<table
									style={{ maxWidth: '600px' }}
									className="table table-condensed mt-3 border-top">
									<tbody>
										<tr>
											<th scope="row">Customer Code</th>
											<td className="ng-binding">
												<p className="ng-binding text-dark text-end">
													{data?.Loan?.customerCode?.customerCode}
												</p>
											</td>
										</tr>
										<tr>
											<th scope="row">First Name</th>
											<td className="ng-binding text-end">
												{data?.Loan?.customerCode?.firstName}{' '}
											</td>
										</tr>
										<tr>
											<th scope="row">Surname</th>
											<td className="ng-binding text-end">
												{data?.Loan?.customerCode?.surName}
											</td>
										</tr>
										<tr>
											<th scope="row">Mobile Number</th>
											<td className="ng-binding text-end">
												{data?.Loan?.customerCode?.number}
											</td>
										</tr>
										<tr>
											<th scope="row">NIC Number</th>
											<td>
												<p className="ng-binding text-end">
													{data?.Loan?.customerCode?.nic}
												</p>
											</td>
										</tr>
									</tbody>
								</table>
							</>
						)}
						{data?.Loan?.guarantorCode && (
							<>
								<h5 className="mt-4 fs-17 text-dark">Guarantor Information</h5>
								<table
									style={{ maxWidth: '600px' }}
									className="table table-condensed mt-3 border-top">
									<tbody>
										<tr>
											<th scope="row">Customer Code</th>
											<td className="ng-binding">
												<p className="ng-binding text-dark text-end">
													{data?.Loan?.guarantorCode.guarantorCode}
												</p>
											</td>
										</tr>
										<tr>
											<th scope="row">First Name</th>
											<td className="ng-binding text-end">
												{data?.Loan?.guarantorCode?.firstName}
											</td>
										</tr>
										<tr>
											<th scope="row">Surname</th>
											<td className="ng-binding text-end">
												{data?.Loan?.guarantorCode?.surName}
											</td>
										</tr>
										<tr>
											<th scope="row">Mobile Number</th>
											<td className="ng-binding text-end">
												{data?.Loan?.guarantorCode?.number}
											</td>
										</tr>
										<tr>
											<th scope="row">NIC Number</th>
											<td>
												<p className="ng-binding text-end">
													{data?.Loan?.guarantorCode?.nic}
												</p>
											</td>
										</tr>
									</tbody>
								</table>
							</>
						)}
					</div>
				</Card.Body>
			</Card>

			<InstallmentColorTable loanInfo={data?.Loan} />
			<BorderedColorTable />
		</>
	)
}

export default index

const BorderedColorTable = () => {
	const { id } = useParams()
	const { data } = useGetPaymentQuery(id)
	let totalBalance: Number = 0

	return (
		<>
			<Card>
				<Card.Header>
					<h4 className="header-title">Payment Information</h4>
				</Card.Header>
				<Card.Body>
					<div className="table-responsive-sm">
						<Table className="table-bordered border-primary table-centered mb-0">
							<thead>
								<tr>
									<th>Customer Name</th>
									<th>Date</th>
									<th>Balance</th>
									<th className="text-center">Action</th>
								</tr>
							</thead>
							<tbody>
								{(data?.payment || []).map((payment: any, idx: Number) => {
									totalBalance = Number(totalBalance) + Number(payment?.balance)
									return (
										<tr key={String(idx)}>
											<td className="table-user">{payment?.customerName}</td>
											<td className="table-user">{payment?.date}</td>
											<td className="table-user">Rs.{payment?.balance}</td>
											<td className="table-user" align="center">
												<DeleteModalSizes data={payment}>
													<i className="ri-delete-bin-2-line" />
												</DeleteModalSizes>
											</td>
										</tr>
									)
								})}
								<tr></tr>
							</tbody>
						</Table>

						<h5 className="mt-3">
							Total Payment:{' '}
							<span className="text-dark">Rs {String(totalBalance)}</span>{' '}
						</h5>

						<div className="d-flex justify-content-between py-3">
							<ActionModal>
								<button className="btn btn-primary">Finished</button>
							</ActionModal>
							<ModalSizes data={data}>
								<button className="btn btn-success">Add New Payment</button>
							</ModalSizes>
						</div>
					</div>
				</Card.Body>
			</Card>
		</>
	)
}

const InstallmentColorTable = ({ loanInfo }: { loanInfo?: any }) => {
	const { id } = useParams()
	const { data } = useGetInstallmentQuery(id)

	return (
		<>
			<Card>
				<Card.Header>
					<h4 className="header-title">Installments Information</h4>
				</Card.Header>
				<Card.Body>
					<div className="table-responsive-sm">
						<Table className="table-bordered border-primary table-centered mb-0">
							<thead>
								<tr>
									<th>Date</th>
									<th>Balance (Rs)</th>
									<th>Status</th>
									<th className="text-center">Action</th>
								</tr>
							</thead>
							<tbody>
								{(data?.Installment || []).map((info: any, idx: Number) => {
									return (
										<tr key={String(idx)}>
											<td className="table-user">
												{info?.date ? String(info?.date).split('T')[0] : ''}
											</td>
											<td className="table-user">{info?.balance}</td>
											<td className="table-user">{info?.status}</td>
											<td className="table-user" align="center">
												<Installments
													data={info}
													loanInfo={loanInfo}
													type="edit">
													<i className="ri-settings-3-line" />
												</Installments>
											</td>
										</tr>
									)
								})}
								<tr></tr>
							</tbody>
						</Table>

						<div className="d-flex justify-content-end py-3">
							<Installments>
								<button className="btn btn-success">
									Add New Installments
								</button>
							</Installments>
						</div>
					</div>
				</Card.Body>
			</Card>
		</>
	)
}

const Installments = ({
	children,
	data,
	type,
	loanInfo,
}: {
	children: React.ReactNode
	data?: any
	type?: string
	loanInfo?: any
}) => {
	const { isOpen, size, className, scroll, toggleModal, openModalWithSize } =
		useModal()
	const { id } = useParams()

	const [formData, setFormData] = useState({
		date: '',
		balance: '',
		status: 'Pending',
		loanId: id,
	})
	const [task, setTask] = useState<any>({
		userId: '',
		amount: 0,
		customerCode: '',
		date: '',
		description: '',
		areaId: '',
		installmentId: '',
	})

	useEffect(() => {
		if (type === 'edit') {
			setFormData({
				date: data?.date,
				balance: data?.balance,
				status: data?.status,
				loanId: id,
			})
			setTask({
				...task,
				userId: data?.userId,
				amount: data?.balance,
				customerCode: loanInfo?.customerCode?._id,
				date: data?.date,
				installmentId: data?._id,
			})
		}
	}, [data, loanInfo])

	

	const { data: area } = useGetAAreasQuery({ id: loanInfo?.areaId._id || '45' })

	useEffect(() => {
		if (area?.area?.employeeId?._id && loanInfo?.areaId._id) {
			setTask({
				...task,
				userId: area?.area?.employeeId?._id,
				areaId: loanInfo?.areaId._id,
			})
		}
	}, [area])

	const [createInstallment, { isLoading: createLoading }] =
		useCreateInstallmentMutation()

	const [createUserTask , { isLoading: createTaskLoading }] = useCreateUserTaskMutation()

	const [updateInstallment, { isLoading: updateLoading }] =
		useUpdateInstallmentMutation()
	const [deleteInstallment, { isLoading: deleteLoading }] =
		useDeleteInstallmentMutation()

	const onSubmit = async () => {
		try {
			if (type === 'edit') {
				await updateInstallment({ formData, id: data?._id }).unwrap()
				toast.success('Installment updated successfully')
			} else {
				await createInstallment(formData).unwrap()
				toast.success('Installment added successfully')
				setFormData({ ...formData, date: '', balance: '', status: 'pending' })
			}
			toggleModal()
		} catch (error) {
			console.log(error)
			toast.error('Something went wrong')
		}
	}

	const assignTaskHandler = async () => {
		if (!loanInfo?.areaId) {
			toast.error('Not assigned to any area')
			return
		}
		try {
			const response = await createUserTask(task).unwrap()
			toast.success(response.message)
			toggleModal()
		} catch (error) {
			console.log(error)
			toast.error('Something went wrong')
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
						<h4 className="modal-title">Add New Installment</h4>
					</Modal.Header>
					<Modal.Body>
						<form>
							<FormInput
								name="employeeId"
								label="Employee"
								type="select"
								containerClass="mb-3"
								className="form-select"
								value={formData?.status}
								onChange={(e) =>
									setFormData({ ...formData, status: e.target.value })
								}>
								<option value="Pending">Pending</option>
								<option value="Reminded">Reminded</option>
								<option value="Finished">Finished</option>
							</FormInput>

							<FormInput
								label="Collecting Date"
								type="date"
								name="date"
								value={formData.date}
								onChange={(e) =>
									setFormData({ ...formData, date: e.target.value })
								}
								containerClass="mb-3"
							/>
							<FormInput
								label="Balance"
								type="number"
								name="balance"
								value={formData.balance}
								onChange={(e) =>
									setFormData({ ...formData, balance: e.target.value })
								}
								containerClass="mb-3"
							/>
						</form>
						{data?.description && (
							<>
								<h5>Description </h5>
								<p>{data?.description}</p>
							</>
						)}
					</Modal.Body>
					<Modal.Footer>
						<Button variant="light" onClick={toggleModal}>
							Close
						</Button>{' '}
						{type === 'edit' && data.status !== 'Finished' && (
							<Button
								disabled={createLoading}
								variant="danger"
								onClick={async () => {
									await deleteInstallment(data?._id)
									toggleModal()
								}}>
								{deleteLoading && <Spinner size="sm" className="me-2" />}
								Delete
							</Button>
						)}
						<Button onClick={assignTaskHandler}>
						{createTaskLoading && <Spinner size="sm" className="me-2" />}
						Assign Task</Button>
						<Button onClick={onSubmit}>
							{updateLoading && <Spinner size="sm" className="me-2" />}
							{createLoading && <Spinner size="sm" className="me-2" />}Save
							changes
						</Button>
					</Modal.Footer>
				</Modal>
			</div>
		</>
	)
}

const ModalSizes = ({ children, data }: { children: any; data?: any }) => {
	const { isOpen, size, className, scroll, toggleModal, openModalWithSize } =
		useModal()
	const { id } = useParams()
	const [formData, setFormData] = useState({
		customerName: '',
		date: new Date().toISOString().substr(0, 10),
		balance: '',
		loanId: id,
	})
	const [createPayment, { isLoading: createLoading }] =
		useCreatePaymentMutation()

	const onSubmit = async () => {
		try {
			await createPayment(formData).unwrap()
			toggleModal()
			toast.success('Payment added successfully')
			setFormData({ ...formData, customerName: '', balance: '' })
		} catch (error) {
			console.log(error)
			toast.error('Something went wrong')
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
						<h4 className="modal-title">Add New Payment</h4>
					</Modal.Header>
					<Modal.Body>
						<form>
							<FormInput
								label="Customer Name"
								type="text"
								name="customerName"
								value={formData.customerName}
								onChange={(e) =>
									setFormData({ ...formData, customerName: e.target.value })
								}
								containerClass="mb-3"
							/>

							<FormInput
								label="Collecting Date"
								type="date"
								name="date"
								value={formData.date}
								onChange={(e) =>
									setFormData({ ...formData, date: e.target.value })
								}
								containerClass="mb-3"
							/>
							<FormInput
								label="Balance"
								type="number"
								name="balance"
								value={formData.balance}
								onChange={(e) =>
									setFormData({ ...formData, balance: e.target.value })
								}
								containerClass="mb-3"
							/>
						</form>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="light" onClick={toggleModal}>
							Close
						</Button>{' '}
						<Button onClick={onSubmit}>
							{createLoading && <Spinner size="sm" className="me-2" />}Save
							changes
						</Button>
					</Modal.Footer>
				</Modal>
			</div>
		</>
	)
}

const DeleteModalSizes = ({
	children,
	data,
}: {
	children: any
	data?: any
}) => {
	const { isOpen, size, className, scroll, toggleModal, openModalWithSize } =
		useModal()
	const [deletePayment, { isLoading: deleteLoading }] =
		useDeletePaymentMutation()

	const onSubmit = async () => {
		try {
			await deletePayment(data._id).unwrap()
			toggleModal()
			toast.success('Payment Deleted successfully')
		} catch (error) {
			console.log(error)
			toast.error('Something went wrong')
		}
	}

	return (
		<>
			<div className="d-flex flex-wrap gap-2">
				<div onClick={() => openModalWithSize('sm')} className="flex">
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
						<h4 className="modal-title">Delete Payment</h4>
					</Modal.Header>
					<Modal.Body>
						<p>Are you sure you want to delete this payment</p>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="light" onClick={toggleModal}>
							Close
						</Button>{' '}
						<Button variant="danger" onClick={onSubmit}>
							{deleteLoading && <Spinner size="sm" className="me-2" />}
							Delete
						</Button>
					</Modal.Footer>
				</Modal>
			</div>
		</>
	)
}

const ActionModal = ({ children, data }: { children: any; data?: any }) => {
	const { isOpen, size, className, scroll, toggleModal, openModalWithSize } =
		useModal()
	const { id } = useParams()
	const [formData] = useState<any>({
		status: 'Finished',
	})
	const [action, { isLoading: actionLoading }] = useActionLoanMutation()

	const onSubmit = async () => {
		try {
			const response = await action({ formData, id }).unwrap()
			toast.success(response.message)
			toggleModal()
		} catch (error: any) {
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
						<h4 className="modal-title">Finish loan</h4>
					</Modal.Header>
					<Modal.Body>
						<h4>Are you sure you want to {formData.status} this loan</h4>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="light" onClick={toggleModal}>
							Close
						</Button>{' '}
						<Button onClick={() => onSubmit()} variant="success">
							{actionLoading && <Spinner size="sm" className="me-2" />}
							Finished
						</Button>
					</Modal.Footer>
				</Modal>
			</div>
		</>
	)
}
