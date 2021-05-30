import DashboardShell from '@/components/DashboardShell'
import { useAuth } from '@/lib/auth'
import { createCheckoutSession } from '@/lib/firestore'
import { Box, Button } from '@chakra-ui/react'

const Account = () => {
  const auth = useAuth()
  return (
    <DashboardShell>
      {auth?.user && (
        <Box>
          <Button
            onClick={() => createCheckoutSession(auth?.user?.uid!)}
            backgroundColor='gray.900'
            color='white'
            fontWeight='medium'
            _hover={{ bg: 'gray.700' }}
            _active={{
              bg: 'gray.800',
              transform: 'scale(0.95)',
            }}
          >
            Upgrade to Starter
          </Button>
          <Button ml={4} onClick={() => auth.signout()}>
            Log Out
          </Button>
        </Box>
      )}

    </DashboardShell>
  )
}

export default Account
