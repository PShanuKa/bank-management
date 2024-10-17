import { Col, Row } from 'react-bootstrap'
import Statistics from './Statistics'
import Projects from './Projects'
import { PageBreadcrumb } from '@/components'
import {  statistics } from './data'

const Dashboard = () => {
	return (
		<>
			<PageBreadcrumb title="Welcome!" subName="Dashboards" />
			<Row>
				{(statistics || []).map((item, idx) => {
					return (
						<Col xxl={3} sm={6} key={idx}>
							<Statistics
								title={item.title}
								stats={item.stats}
								change={item.change}
								icon={item.icon}
								variant={item.variant}
							/>
						</Col>
					)
				})}
			</Row>
			<Row>
				<Col xl={12}>
					<Projects />
				</Col>
			</Row>
		</>
	)
}

export default Dashboard


