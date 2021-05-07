import '../styles/globals.css'
import { AppProps } from 'next/app'
import { AuthProvider } from '../lib/auth'

const App = ({ Component, pageProps }: AppProps) => (
  <AuthProvider>
    <Component {...pageProps} />
  </AuthProvider>
)

export default App
