import { useAuth } from '@/lib/auth'
import { Button, Stack } from '@chakra-ui/react'
import { GitHub, Google } from './Icons'

const LoginButtons = () => {
  const auth = useAuth()
  return (
    <Stack isInline>
      <Button
        onClick={() => auth?.signinWithGithub()}
        backgroundColor='gray.900'
        color='white'
        fontWeight='medium'
        leftIcon={<GitHub />}
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
        backgroundColor='white'
        color='gray.900'
        fontWeight='medium'
        variant='outline'
        leftIcon={<Google />}
        _hover={{ bg: 'gray.100' }}
        _active={{
          bg: 'gray.100',
          transform: 'scale(0.95)',
        }}
      >
        Sign In with Google
      </Button>
    </Stack>
  )
}

export default LoginButtons
