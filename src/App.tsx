// import configureFakeBackend from './common/api/fake-backend'
import { ThemeProvider } from './common/context'
import AllRoutes from './routes/Routes'

import './assets/scss/app.scss'
import './assets/scss/icons.scss'
import { AuthProvider } from './common/context/useAuthContext'

import { ToastContainer } from 'material-react-toastify'
import 'material-react-toastify/dist/ReactToastify.css'

// configureFakeBackend()

function App() {
	return (
		<ThemeProvider>
			<AuthProvider>
				<ToastContainer />
				<AllRoutes />
			</AuthProvider>
		</ThemeProvider>
	)
}

export default App
