import '../styles/globals.css'
import { AppProps } from 'next/app'
import { ProvideAuth } from '../lib/auth'

const MyApp = ({ Component, pageProps }: AppProps) => (
  <ProvideAuth>
    <Component {...pageProps} />
  </ProvideAuth>
)

export default MyApp
