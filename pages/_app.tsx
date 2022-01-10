import { ChakraProvider } from '@chakra-ui/react'
import { AppProps } from 'next/app'
import { AuthProvider } from '@/lib/auth'
import customTheme from '@/styles/theme'
import { DefaultSeo } from 'next-seo'
import SEO from 'next-seo.config'

const App = ({ Component, pageProps }: AppProps) => (
  <ChakraProvider theme={customTheme} resetCSS>
    <AuthProvider>
      <DefaultSeo {...SEO} />
      <Component {...pageProps} />
    </AuthProvider>
  </ChakraProvider>
)

export default App
