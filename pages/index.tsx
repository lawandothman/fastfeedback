import Head from 'next/head'
import { Button, Flex, Text } from '@chakra-ui/react'
import { useAuth } from '@/lib/auth'
import Logo from '@/components/Logo'

const Home = () => {
  const auth = useAuth()
  return (
    <Flex
      as='main'
      direction='column'
      align='center'
      justify='center'
      h='100vh'
      maxW='400px'
      margin='0 auto'
    >
      <Head>
        <title>Fast Feedback</title>
      </Head>
      <Logo color='black' boxSize='42px' mb={2} />
      <Text mb={4}>
        <Text as='span' fontWeight='bold' display='inline'>
          Fast Feedback
        </Text>
        <br />
        The easiest way to add comments or reviews to your static site.
      </Text>
      {auth?.user ? (
        <Button as='a' size='sm' fontWeight='medium' href='/dashboard'>
          View Dashboard
        </Button>
      ) : (
        <Button
          mt={4}
          size='sm'
          fontWeight='medium'
          onClick={() => auth?.signinWithGithub()}
        >
          Sign In
        </Button>
      )}
    </Flex>
  )
}

export default Home
