
import { FormInput, PageBreadcrumb } from '@/components'
import {
	useGetAllLoanQuery,
} from '@/features/api/loanSlice'
import {  useState } from 'react'
import {
	Card,
	Placeholder,
	Table,
} from 'react-bootstrap'
import { Link } from 'react-router-dom'


const index = () => {
	return (
		<>
			<PageBreadcrumb title="Loans" subName="Report" />
			<StripedRows />
		</>
	)
}

export default index



const StripedRows = () => {
	const [statusFilter, setStatusFilter] = useState('')
	const [page] = useState(1)
	const limit = 10000
	const { data, isLoading: loading } = useGetAllLoanQuery({ status: statusFilter ,limit,page})

	return (
		<>
			<Card>
				<Card.Header className="d-flex justify-content-between">
					<h4 className="header-title">Loans</h4>
				
				</Card.Header>
				<Card.Body>
					<div style={{ maxWidth: '300px' }}>
						<FormInput
							label="Loan Status"
							type="select"
							name="areaId"
							onChange={(e) => setStatusFilter(e.target.value)}
							containerClass="mb-3"
							className="form-select">
							<option defaultValue={''} value={''}>
								All
							</option>
							<option value="Pending">Pending</option>
							<option value="Approved">Approved</option>
							<option value="Finished">Finished</option>
							<option value="Rejected">Rejected</option>
						</FormInput>
					</div>
					<div className="table-responsive-sm">
						<Table className="table-striped table-centered mb-0">
							<thead>
								<tr>
									<th>Loan ID</th>
									{/* <th>Area Code</th> */}
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
                            <Link to={`${record?._id}`}>
															<i className="ri-settings-3-line" />
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

