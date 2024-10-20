

export interface MenuItemTypes {
	key: string
	label: string
	isTitle?: boolean
	icon?: string
	url?: string
	badge?: {
		variant: string
		text: string
	}
	parentKey?: string
	target?: string
	children?: MenuItemTypes[]
}


const ADMIN_MENU_ITEMS: MenuItemTypes[] = [
	{
		key: 'Main',
		label: 'Main',
		isTitle: true,
	},
	{
		key: 'Dashboard',
		label: 'Dashboard',
		url: '/',
		isTitle: false,
		icon: 'ri-dashboard-3-line',
	},
	{
		key: 'Master Files',
		label: 'Master Files',
		isTitle: false,
		icon: ' ri-building-4-line',
		children: [
			{
				key: `employee-master`,
				label: 'Employee Master',
				url: '/master-files/employee-master',
				parentKey: 'master-files',
			},

			{
				key: 'area-master',
				label: 'Area Master',
				url: '/master-files/area-master',
				parentKey: 'master-files',
			},

			{
				key: 'customer-master',
				label: 'Customer Master',
				url: '/master-files/customer-master',
				parentKey: 'master-files',
			},
			{
				key: 'guarantor-master',
				label: 'Guarantor Master',
				url: '/master-files/guarantor-master',
				parentKey: 'master-files',
			},
		],
	},
	{
		key: 'transaction',
		label: 'Transaction',
		isTitle: false,
		icon: 'ri-bar-chart-box-fill',
		children: [
			{
				key: 'loans',
				label: 'Loans',
				url: '/transaction/loans',
				parentKey: 'transaction',
			},
		],
	},
	{
		key: 'reports',
		label: 'Reports',
		isTitle: false,
		icon: 'ri-database-line',
		children: [
			{
				key: 'loan-detailed-report',
				label: 'Loan Detailed Report',
				url: '/report/loans',
				parentKey: 'reports',
			},
			{
				key: 'User Dashboard',
				label: 'User Dashboard Report',
				url: '/report/user-dashboard',
				parentKey: 'reports',
			},
			{
				key: 'loan-reminder',
				label: 'Loan Reminder',
				url: '/report/loan-reminder',
				parentKey: 'reports',
			},
		],
	},
	{
		key: 'setting',
		label: 'Setting',
		isTitle: false,
		icon: 'ri-file-settings-line',
		children: [
			{
				key: 'user-permissions',
				label: 'User Permissions',
				url: '/setting/user-permissions',
				parentKey: 'setting',
			},
			{
				key: 'loan-settings',
				label: 'Loan Settings',
				url: '/setting/loan',
				parentKey: 'setting',
			},
		],
	},
]

const MENU_ITEMS: MenuItemTypes[] = [
	{
		key: 'Main',
		label: 'Main',
		isTitle: true,
	},
	{
		key: 'Dashboard',
		label: 'Dashboard',
		url: '/',
		isTitle: false,
		icon: 'ri-dashboard-3-line',
	},
	{
		key: 'Master Files',
		label: 'Master Files',
		isTitle: false,
		icon: 'ri-building-4-line',
		children: [
			{
				key: 'customer-master',
				label: 'Customer Master',
				url: '/master-files/customer-master',
				parentKey: 'master-files',
			},
			{
				key: 'guarantor-master',
				label: 'Guarantor Master',
				url: '/master-files/guarantor-master',
				parentKey: 'master-files',
			},
		],
	},
	{
		key: 'transaction',
		label: 'Transaction',
		isTitle: false,
		icon: 'ri-bar-chart-box-fill',
		children: [
			{
				key: 'loans',
				label: 'Loans',
				url: '/transaction/loans',
				parentKey: 'transaction',
			},
		],
	},
	// {
	// 	key: 'reports',
	// 	label: 'Reports',
	// 	isTitle: false,
	// 	icon: 'ri-dashboard-3-line',
	// 	children: [
	// 		{
	// 			key: 'loan-detailed-report',
	// 			label: 'Loan Detailed Report',
	// 			url: '/report/loans',
	// 			parentKey: 'reports',
	// 		},
	// 		{
	// 			key: 'User Dashboard',
	// 			label: 'User Dashboard Report',
	// 			url: '/report/user-dashboard',
	// 			parentKey: 'reports',
	// 		},
	// 		{
	// 			key: 'collection-report',
	// 			label: 'Collection Report',
	// 			url: '/reports/collection-report',
	// 			parentKey: 'reports',
	// 		},
	// 		{
	// 			key: 'loan-reminder',
	// 			label: 'Loan Reminder',
	// 			url: '/report/loan-reminder',
	// 			parentKey: 'reports',
	// 		},
	// 		{
	// 			key: 'monthly-revenue-report',
	// 			label: 'Monthly Revenue Report',
	// 			url: '/reports/monthly-revenue-report',
	// 			parentKey: 'reports',
	// 		},
	// 	],
	// },
	// {
	// 	key: 'setting',
	// 	label: 'Setting',
	// 	isTitle: false,
	// 	icon: 'ri-dashboard-3-line',
	// 	children: [
	// 		{
	// 			key: 'user-permissions',
	// 			label: 'User Permissions',
	// 			url: '/setting/user-permissions',
	// 			parentKey: 'setting',
	// 		},
	// 		{
	// 			key: 'loan-settings',
	// 			label: 'Loan Settings',
	// 			url: '/setting/loan',
	// 			parentKey: 'setting',
	// 		},
	// 	],
	// },
]

const HORIZONTAL_MENU_ITEMS: MenuItemTypes[] = [
	{
		key: 'dashboard',
		icon: 'ri-dashboard-3-line',
		label: 'Dashboards',
		isTitle: true,
		children: [
			{
				key: 'dashboard',
				label: 'Dashboard',
				url: '/',
				parentKey: 'dashboard',
			},
		],
	},
]

export { MENU_ITEMS, HORIZONTAL_MENU_ITEMS , ADMIN_MENU_ITEMS}
