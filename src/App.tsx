import configureFakeBackend from './common/api/fake-backend'
import { ThemeProvider } from './common/context'
import AllRoutes from './routes/Routes'

import './assets/scss/app.scss'
import './assets/scss/icons.scss'
import { AuthProvider } from './common/context/useAuthContext'



// import { Provider } from 'react-redux'
// import { store } from './app/store'

configureFakeBackend()

function App() {
	
	return (
		<ThemeProvider>
			{/* <Provider store={store}> */}
				<AuthProvider>
					<AllRoutes />
				</AuthProvider>
			{/* </Provider> */}
		</ThemeProvider>
	)
}

export default App
