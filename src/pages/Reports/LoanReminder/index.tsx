import { FormInput, PageBreadcrumb } from '@/components'
import {

	useGetReminderLoanQuery,
	useUpdateLoanMutation,
} from '@/features/api/loanSlice'

import { useModal } from '@/hooks'

import { useState } from 'react'
import { Button, Card, Modal, Placeholder,  Table } from 'react-bootstrap'


const index = () => {
	return (
		<>
			<PageBreadcrumb title="Loans Reminder" subName="Report" />
			<StripedRows />
		</>
	)
}

export default index

const StripedRows = () => {
	const date = new Date().toISOString().substr(0, 10)
	console.log(date)
	// const [page] = useState(1)
	// const limit = 10000
	const { data, isLoading: loading } = useGetReminderLoanQuery(date)

	return (
		<>
			<Card>
				<Card.Header className="d-flex justify-content-between">
					<h4 className="header-title">Loans Reminder</h4>
				</Card.Header>
				<Card.Body>
					<div className="table-responsive-sm">
						<Table className="table-striped table-centered mb-0">
							<thead>
								<tr>
									<th>Loan ID</th>
									<th>Customer ID</th>
									<th>Customer Name</th>
									<th>Amount</th>
									<th>Of Installments</th>
									<th>Status</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody>
								{!loading
									? (data?.loans || []).map((record: any, idx: any) => {
											return (
												<tr key={idx}>
													<td>{record.loanCode}</td>
													<td className="table-user">
														&nbsp;{record?.customerCode?.customerCode}
													</td>
													<td className="table-user">
														{record?.customerCode?.firstName}&nbsp;
														{record?.customerCode?.surName}
													</td>
													<td className="table-user">{record?.loanAmount}</td>
													<td className="table-user">
														{record?.ofInstallments}
													</td>
													<td className="table-user">{record?.status}</td>

													<td className="d-flex gap-3">
														<ActionModal data={record}>
															<i className="ri-settings-3-line" />
														</ActionModal>
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

const ActionModal = ({ children, data }: { children: any; data?: any }) => {
	const { isOpen, size, className, scroll, toggleModal, openModalWithSize } =
		useModal()
	const [formData, setFormData] = useState<any>({
		reminderDescription: '',
		endDate: data.endDate,
	})
	
	const [updateReminder] = useUpdateLoanMutation()
	const handleSubmit = (e: any) => {
		e.preventDefault()
		updateReminder({ id: data._id, formData })
		toggleModal()
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
						<h4 className="modal-title">Loan Action</h4>
					</Modal.Header>
					<Modal.Body>
						<form>
							<FormInput
								label="Description"
								type="textarea"
								name="description"
								value={formData.reminderDescription}
								onChange={(e) => setFormData({ ...formData, reminderDescription: e.target.value })}
								containerClass="mb-3"
							/>
							<h5>Payment Receipt</h5>
							
							
							<FormInput
								type="date"
								name="file"
								containerClass="mb-3"
								value={String(formData.endDate.slice(0, 10))}
								onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
							/>
						</form>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="light" onClick={toggleModal}>
							Close
						</Button>{' '}
						
						<Button
							onClick={handleSubmit}
							variant="success">
							Save Change
						</Button>
					</Modal.Footer>
				</Modal>
			</div>
		</>
	)
}
