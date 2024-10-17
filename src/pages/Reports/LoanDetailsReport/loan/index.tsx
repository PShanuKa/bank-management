import { FormInput, PageBreadcrumb } from '@/components'
import {
	useCreatePaymentMutation,
	useDeletePaymentMutation,
	useGetPaymentQuery,
} from '@/features/api/paymentSlice'
import { useModal } from '@/hooks'
import { toast } from 'material-react-toastify'
import { useState } from 'react'
import { Button, Card, Image, Modal, Table } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { useGetALoanQuery } from '@/features/api/loanSlice'

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
										<p className="ng-binding text-end">{data?.Loan?.endDate}</p>
									</td>
								</tr>
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
											{data?.Loan?.collectWeek
											}
										</p>
									</td>
								</tr>
								<tr>
									<th scope="row">Day</th>
									<td>
										<p className="ng-binding text-end">{data?.Loan?.collectDay}</p>
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
											<td className="ng-binding text-end">{data?.Loan?.guarantorCode?.surName}</td>
										</tr>
										<tr>
											<th scope="row">Mobile Number</th>
											<td className="ng-binding text-end">{data?.Loan?.guarantorCode?.number}</td>
										</tr>
										<tr>
											<th scope="row">NIC Number</th>
											<td>
												<p className="ng-binding text-end">{data?.Loan?.guarantorCode?.nic}</p>
											</td>
										</tr>
									</tbody>
								</table>
							</>
						)}
					</div>
				</Card.Body>
			</Card>

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

						<h5 className="mt-3">Total Payment: <span className="text-dark">Rs {String(totalBalance)}</span> </h5>

						<div className="d-flex justify-content-end py-3">
							<ModalSizes>
								<button className="btn btn-primary">Add New</button>
							</ModalSizes>
						</div>
					</div>
				</Card.Body>
			</Card>
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
	const [createPayment] = useCreatePaymentMutation()

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
						<Button onClick={onSubmit}>Save changes</Button>
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
	const [deletePayment] = useDeletePaymentMutation()

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
							Delete
						</Button>
					</Modal.Footer>
				</Modal>
			</div>
		</>
	)
}
