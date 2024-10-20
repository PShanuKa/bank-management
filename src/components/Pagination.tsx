import { useEffect, useState } from 'react'
import { Card, Pagination as BootstrapPagination } from 'react-bootstrap'

const PaginationWithStates = ({
	pages,
	handlePageChange,
}: {
	pages?: number
	handlePageChange: (page: number) => void
}) => {
	const [activePage, setActivePage] = useState(1)
	const [totalPages, setTotalPages] = useState(0)

	useEffect(() => {
		setTotalPages(pages || 1)
	}, [pages])

	const handlePrevPage = () => {
		if (activePage > 1) {
			setActivePage(activePage - 1)
			handlePageChange(activePage - 1)
		}
	}

	const handleNextPage = () => {
		if (activePage < totalPages) {
			setActivePage(activePage + 1)
			handlePageChange(activePage + 1)
		}
	}

	const handleNumberClick = (number: number) => {
		setActivePage(number)
		handlePageChange(number)
	}

	const paginationItems = []
	for (let i = 1; i <= totalPages; i++) {
		paginationItems.push(
			<BootstrapPagination.Item
				key={i}
				active={i === activePage}
				onClick={() => handleNumberClick(i)}>
				{i}
			</BootstrapPagination.Item>
		)
	}

	return (
		<Card>
			<Card.Body>
				<nav aria-label="Pagination">
					<BootstrapPagination className="mb-0">
						<BootstrapPagination.Prev
							disabled={activePage === 1}
							onClick={handlePrevPage}>
							Previous
						</BootstrapPagination.Prev>
						{paginationItems}
						<BootstrapPagination.Next
							disabled={activePage === totalPages}
							onClick={handleNextPage}>
							Next
						</BootstrapPagination.Next>
					</BootstrapPagination>
				</nav>
			</Card.Body>
		</Card>
	)
}

export default PaginationWithStates
