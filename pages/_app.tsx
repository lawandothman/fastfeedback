import { ChakraProvider } from '@chakra-ui/react'
import { AppProps } from 'next/app'
import { AuthProvider } from '@/lib/auth'
import customTheme from '@/styles/theme'

const App = ({ Component, pageProps }: AppProps) => (
  <ChakraProvider theme={customTheme} resetCSS>
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  </ChakraProvider>
)

export default App
