import Head from 'next/head'
import {
  Box, Button, Flex, Stack, Text,
} from '@chakra-ui/react'
import { useAuth } from '@/lib/auth'
import { GitHub, Google, Logo } from '@/components/Icons'

const Home = () => {
  const auth = useAuth()
  return (
    <Box bg='gray.100'>
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
          <script
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: `
              if(document.cookie && document.cookie.includes('fast-feedback-auth')) {
                window.location.href= '/dashboard'
              }
              `,
            }}
          />
          <title>Fast Feedback</title>
        </Head>
        <Logo color='black' boxSize='64px' mb={2} />
        <Text mb={8} fontSize='lg'>
          <Text as='span' fontWeight='bold' display='inline'>
            Fast Feedback
          </Text>
          <br />
          The easiest way to add comments or reviews to your static site.
        </Text>
        {auth?.user ? (
          <Button
            as='a'
            href='/dashboard'
            mt={4}
            size='lg'
            backgroundColor='white'
            color='gray.900'
            variant='outline'
            fontWeight='medium'
            _hover={{ bg: 'gray.100' }}
            _active={{
              bg: 'gray.100',
              transform: 'scale(0.95)',
            }}
          >
            View Dashboard
          </Button>
        ) : (
          <Stack spacing={8}>
            <Button
              onClick={() => auth?.signinWithGithub()}
              backgroundColor='gray.900'
              color='white'
              fontWeight='medium'
              leftIcon={<GitHub />}
              mt={4}
              size='lg'
              _hover={{ bg: 'gray.700' }}
              _active={{
                bg: 'gray.800',
                transform: 'scale(0.95)',
              }}
            >
              Sign In with GitHub
            </Button>
            <Button
              onClick={() => auth?.signinWithGoogle()}
              leftIcon={<Google />}
              mt={4}
              size='lg'
              backgroundColor='white'
              color='gray.900'
              variant='outline'
              fontWeight='medium'
              _hover={{ bg: 'gray.100' }}
              _active={{
                bg: 'gray.100',
                transform: 'scale(0.95)',
              }}
            >
              Sign In with Google
            </Button>
          </Stack>
        )}
      </Flex>
    </Box>
  )
}

export default Home
