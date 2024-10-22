import React from 'react'
import { Route, RouteProps } from 'react-router-dom'

// components
import PrivateRoute from './PrivateRoute'

// lazy load all the views

// auth
const Login = React.lazy(() => import('../pages/auth/Login'))
const Logout = React.lazy(() => import('../pages/auth/Logout'))


// // dashboard
const Dashboard = React.lazy(() => import('../pages/Dashboard'))
const EmpolyeeMaster = React.lazy(() => import('../pages/MasterFiles/EmployeeMaster'))
const AreaMaster = React.lazy(() => import('../pages/MasterFiles/AreaMaster'))
const CustomerMaster = React.lazy(() => import('../pages/MasterFiles/CustomerMaster'))
const GuarantorMaster = React.lazy(() => import('../pages/MasterFiles/GuarantorMaster'))
const Loan = React.lazy(() => import('../pages/Transactions'))
const UserDashboardReport = React.lazy(() => import('../pages/Reports/UserDashboard'))
const LoanReminder = React.lazy(() => import('../pages/Reports/LoanReminder'))
const LoanSetting = React.lazy(() => import('../pages/Setting/Loan'))
const UserPermissions = React.lazy(() => import('../pages/Setting/UserPermissions'))


// // pages
const ProfilePages = React.lazy(() => import('../pages/other/Profile/'))
const InvoicePages = React.lazy(() => import('../pages/other/Invoice'))
const FAQPages = React.lazy(() => import('../pages/other/FAQ'))
const PricingPages = React.lazy(() => import('../pages/other/Pricing'))
const MaintenancePages = React.lazy(() => import('../pages/other/Maintenance'))
const StarterPages = React.lazy(() => import('../pages/other/Starter'))
const ContactListPages = React.lazy(() => import('../pages/other/ContactList'))
const TimelinePages = React.lazy(() => import('../pages/other/Timeline'))
const LoanDetails = React.lazy(() => import('../pages/Reports/LoanDetailsReport'))
const SingleLoan = React.lazy(() => import('../pages/Reports/LoanDetailsReport/loan'))



 // error
const Error404 = React.lazy(() => import('../pages/error/Error404'))
const Error404Alt = React.lazy(() => import('../pages/error/Error404Alt'))
const Error500 = React.lazy(() => import('../pages/error/Error500'))

export interface RoutesProps {
	path: RouteProps['path']
	name?: string
	element?: RouteProps['element']
	route?: any
	exact?: boolean
	icon?: string
	header?: string
	roles?: string[]
	children?: RoutesProps[]
}

// dashboards
const dashboardRoutes: RoutesProps = {
	path: '/dashboard',
	name: 'Dashboards',
	icon: 'home',
	header: 'Navigation',
	children: [
		{
			path: '/',
			name: 'Root',
			element: <Dashboard />,
			route: PrivateRoute,
		},
		{
			path: 'master-files/customer-master',
			name: 'Root',
			element: <CustomerMaster />,
			route: PrivateRoute,
		},
		{
			path: 'master-files/employee-master',
			name: 'Employee Master',
			element: <EmpolyeeMaster />,
			route: PrivateRoute,
		},
		{
			path: 'master-files/area-master',
			name: 'Area Master',
			element: <AreaMaster />,
			route: PrivateRoute,
		},
		{
			path: 'master-files/guarantor-master',
			name: 'Guarantor-master',
			element: <GuarantorMaster />,
			route: PrivateRoute,
		},
		{
			path: 'transaction/loans',
			name: 'Loan',
			element: <Loan />,
			route: PrivateRoute,
		},
		{
			path: 'setting/loan',
			name: 'Loan',
			element: <LoanSetting />,
			route: PrivateRoute,
		},
		{
			path: 'setting/user-permissions',
			name: 'User Permissions',
			element: <UserPermissions />,
			route: PrivateRoute,
		},
		{
			path: 'report/loans',
			name: 'LoanDetails',
			element: <LoanDetails />,
			route: PrivateRoute,
		},
		{
			path: 'report/loans/:id',
			name: 'LoanDetails',
			element: <SingleLoan />,
			route: PrivateRoute,
		},
		{
			path: 'report/user-dashboard',
			name: 'user-dashboard',
			element: <UserDashboardReport />,
			route: PrivateRoute,
		},
		{
			path: 'report/loan-reminder',
			name: 'loan-reminder',
			element: <LoanReminder />,
			route: PrivateRoute,
		}
	],
}

// pages
const customPagesRoutes = {
	path: '/pages',
	name: 'Pages',
	icon: 'pages',
	header: 'Custom',
	children: [
		{
			path: '/pages/profile',
			name: 'Profile',
			element: <ProfilePages />,
			route: PrivateRoute,
		},
		{
			path: '/pages/invoice',
			name: 'Invoice',
			element: <InvoicePages />,
			route: PrivateRoute,
		},
		{
			path: '/pages/faq',
			name: 'FAQ',
			element: <FAQPages />,
			route: PrivateRoute,
		},
		{
			path: '/pages/pricing',
			name: 'Pricing',
			element: <PricingPages />,
			route: PrivateRoute,
		},
		{
			path: '/pages/starter',
			name: 'Starter Page',
			element: <StarterPages />,
			route: PrivateRoute,
		},
		{
			path: '/pages/contact-list',
			name: 'Contact List',
			element: <ContactListPages />,
			route: PrivateRoute,
		},
		{
			path: '/pages/timeline',
			name: 'Timeline',
			element: <TimelinePages />,
			route: PrivateRoute,
		},
		{
			path: 'pages/error-404-alt',
			name: 'Error - 404-alt',
			element: <Error404Alt />,
			route: PrivateRoute,
		},
	],
}


// auth
const authRoutes: RoutesProps[] = [
	{
		path: '/auth/login',
		name: 'Login',
		element: <Login />,
		route: Route,
	},
	{
		path: '/auth/logout',
		name: 'Logout',
		element: <Logout />,
		route: Route,
	},

]

// public routes
const otherPublicRoutes = [
	{
		path: '*',
		name: 'Error - 404',
		element: <Error404 />,
		route: Route,
	},
	{
		path: 'pages/error-404',
		name: 'Error - 404',
		element: <Error404 />,
		route: Route,
	},
	{
		path: 'pages/error-500',
		name: 'Error - 500',
		element: <Error500 />,
		route: Route,
	},
	{
		path: '/pages/maintenance',
		name: 'Maintenance',
		element: <MaintenancePages />,
		route: Route,
	},
]

// flatten the list of all nested routes
const flattenRoutes = (routes: RoutesProps[]) => {
	let flatRoutes: RoutesProps[] = []

	routes = routes || []
	routes.forEach((item: RoutesProps) => {
		flatRoutes.push(item)
		if (typeof item.children !== 'undefined') {
			flatRoutes = [...flatRoutes, ...flattenRoutes(item.children)]
		}
	})
	return flatRoutes
}

// All routes
const authProtectedRoutes = [dashboardRoutes, customPagesRoutes]
const publicRoutes = [...authRoutes, ...otherPublicRoutes]

const authProtectedFlattenRoutes = flattenRoutes([...authProtectedRoutes])
const publicProtectedFlattenRoutes = flattenRoutes([...publicRoutes])
export {
	publicRoutes,
	authProtectedRoutes,
	authProtectedFlattenRoutes,
	publicProtectedFlattenRoutes,
}
