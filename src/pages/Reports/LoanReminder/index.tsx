import { FormInput, PageBreadcrumb } from '@/components'
import PaginationWithStates from '@/components/Pagination'
import {
	useReminderInstallmentQuery,
	useUpdateInstallmentMutation,
} from '@/features/api/installmentSlice'
import {
	useGetReminderLoanQuery,
	useUpdateLoanMutation,
} from '@/features/api/loanSlice'

import { useModal } from '@/hooks'

import { useEffect, useState } from 'react'
import { Button, Card, Modal, Placeholder, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { date } from 'yup'

const index = () => {
	return (
		<>
			<PageBreadcrumb title="Installment Reminder" subName="Report" />
			<StripedRows />
		</>
	)
}

export default index

const StripedRows = () => {
	const date = new Date().toISOString().substr(0, 10)
	const [page, setPage] = useState(1)
	const limit = 20
	const { data, isLoading: loading } = useReminderInstallmentQuery({
		endDate: date,
		page,
		limit,
	})

	const handlePageChange = (page: number) => {
		setPage(page)
	}

	return (
		<>
			<Card>
				<Card.Header className="d-flex justify-content-between">
					<h4 className="header-title">Installment Reminder</h4>
				</Card.Header>
				<Card.Body>
					<div className="table-responsive-sm">
						<Table className="table-striped table-centered mb-0">
							<thead>
								<tr>
									<th>Loan ID</th>
									<th>Balance</th>
									<th>Date</th>
									<th>Status</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody>
								{!loading
									? (data?.Installment || []).map((record: any, idx: any) => {
											return (
												<tr key={idx}>
													<td>{record.loanId.loanCode}</td>
													<td className="table-user">
														&nbsp;{record?.balance}
													</td>
													<td className="table-user">
														{String(record?.date).split('T')[0]}
													</td>
													<td className="table-user">{record?.status}</td>

													<td className="d-flex gap-3">
														<ActionModal data={record} type="edit">
															<i className="ri-settings-3-line" />
														</ActionModal>
														<Link to={`/report/loans/${record?.loanId._id}`}>
															<i className="bi bi-eye"></i>
														</Link>
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

const ActionModal = ({
	children,
	data,
	type,
}: {
	children: any
	data?: any
	type?: string
}) => {
	const { isOpen, size, className, scroll, toggleModal, openModalWithSize } =
		useModal()
	const [formData, setFormData] = useState<any>({
		description: '',
		date: '',
		status: 'Reminded',
	})

	useEffect(() => {
		if (type === 'edit') {
			setFormData({
				...formData,
				description: data?.description,
				date: data?.date,
			})
		}
	}, [data])

	const [updateReminder , { isLoading: createLoading }] = useUpdateInstallmentMutation()
	const handleSubmit = async (e: any) => {
		e.preventDefault()
		await updateReminder({ id: data._id, formData })
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
								value={formData.description}
								onChange={(e) =>
									setFormData({
										...formData,
										description: e.target.value,
									})
								}
								containerClass="mb-3"
							/>

							<FormInput
								type="date"
								name="file"
								containerClass="mb-3"
								value={String(formData.date.slice(0, 10))}
								onChange={(e) =>
									setFormData({ ...formData, date: e.target.value })
								}
							/>
						</form>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="light" onClick={toggleModal}>
							Close
						</Button>{' '}
						<Button onClick={handleSubmit} variant="success">
							{createLoading ? 'Saving...' : 'Save Change'}	
						</Button>
					</Modal.Footer>
				</Modal>
			</div>
		</>
	)
}
