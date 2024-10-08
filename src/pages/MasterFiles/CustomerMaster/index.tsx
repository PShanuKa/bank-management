import { FormInput, PageBreadcrumb } from '@/components'
import { useModal,  } from '@/hooks'
import { records } from '@/pages/ui/tables/data'

import { Button, Card, Modal, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'

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
	return (
		<>
			<Card>
				<Card.Header className="d-flex justify-content-between">
					<h4 className="header-title">Customer Master</h4>
					<ModalSizes />
				</Card.Header>
				<Card.Body>
					<div className="table-responsive-sm">
						<Table className="table-striped table-centered mb-0">
							<thead>
								<tr>
									<th>Location</th>
									<th>Code</th>
									<th>Employee Name</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody>
								{(records || []).map((record, idx) => {
									return (
										<tr key={idx}>
											<td className="table-user">
												<img
													src={record.image}
													alt="table-user"
													className="me-2 rounded-circle"
												/>
												&nbsp;{record.name}
											</td>
											<td>{record.accountNo}</td>
											<td>{record.dob}</td>
											<td>
												<Link to="#" className="text-reset fs-16 px-1">
													{' '}
													<i className="ri-settings-3-line" />
												</Link>
												<Link to="#" className="text-reset fs-16 px-1">
													{' '}
													<i className="ri-delete-bin-2-line" />
												</Link>
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

const ModalSizes = () => {
	const { isOpen, size, className, scroll, toggleModal, openModalWithSize } =
		useModal()
	return (
		<>
			<div className="d-flex flex-wrap gap-2">
				<Button variant="info" onClick={() => openModalWithSize('lg')}>
					Add New Customer
				</Button>

				<Modal
					className="fade"
					show={isOpen}
					onHide={toggleModal}
					dialogClassName={className}
					size={size}
					scrollable={scroll}>
					<Modal.Header onHide={toggleModal} closeButton>
						<h4 className="modal-title">Area Master</h4>
					</Modal.Header>
					<Modal.Body>
						<FormInput
							label="Loan Code"
							type="text"
							name="text"
							containerClass="mb-3"
							// register={register}
							key="text"
							// errors={errors}
							// control={control}
						/>
            <FormInput
							label="NIC Number"
							type="text"
							name="text"
							containerClass="mb-3"
							// register={register}
							key="text"
							// errors={errors}
							// control={control}
						/>
						<FormInput
							name="select"
							label="Location"
							type="select"
							containerClass="mb-3"
							className="form-select"
							// register={register}
							key="select"
							// errors={errors}
							// control={control}
						>
							<option defaultValue="selected">Employee</option>
							<option>Admin</option>
						</FormInput>
            <FormInput
							label="Customer Code"
							type="text"
							name="text"
							containerClass="mb-3"
							// register={register}
							key="text"
							// errors={errors}
							// control={control}
						/>
            <FormInput
							name="select"
							label="Area Code"
							type="select"
							containerClass="mb-3"
							className="form-select"
							// register={register}
							key="select"
							// errors={errors}
							// control={control}
						>
							<option defaultValue="selected">Employee</option>
							<option>Admin</option>
						</FormInput>

						<h4 className="header-title">Personal Details</h4>
						

						<FormInput
							label="First Name"
							type="text"
							name="text"
							containerClass="mb-3"
							// register={register}
							key="text"
							// errors={errors}
							// control={control}
						/>
						<FormInput
							label="Surname"
							type="text"
							name="text"
							containerClass="mb-3"
							// register={register}
							key="text"
							// errors={errors}
							// control={control}
						/>
            <FormInput
							label="Date Of Birth"
							type="date"
							name="text"
							containerClass="mb-3"
							// register={register}
							key="text"
							// errors={errors}
							// control={control}
						/>
						<FormInput
							name="select"
							label="Gender"
							type="select"
							containerClass="mb-3"
							className="form-select"
							// register={register}
							key="select"
							// errors={errors}
							// control={control}
						>
							<option defaultValue="selected">Male</option>
							<option>Female</option>
							<option>Other</option>
						</FormInput>

						<FormInput
							label="Mobile Number"
							type="text"
							name="text"
							containerClass="mb-3"
							// register={register}
							key="text"
							// errors={errors}
							// control={control}
						/>
						<FormInput
							label="Address"
							type="text"
							name="text"
							containerClass="mb-3"
							// register={register}
							key="text"
							// errors={errors}
							// control={control}
						/>
						<FormInput
							name="select"
							label="Civil Status"
							type="select"
							containerClass="mb-3"
							className="form-select"
							// register={register}
							key="select"
							// errors={errors}
							// control={control}
						>
							<option defaultValue="selected">Single</option>
							<option>Married</option>
							<option>Divorced</option>
							<option>Widowed</option>
						</FormInput>
					</Modal.Body>

							
						

	
			
					<Modal.Footer>
						<Button variant="light" onClick={toggleModal}>
							Close
						</Button>{' '}
						<Button onClick={toggleModal}>Save changes</Button>
					</Modal.Footer>
				</Modal>
			</div>
		</>
	)
}
