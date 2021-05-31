import DashboardShell from '@/components/DashboardShell'
import { useAuth } from '@/lib/auth'
import { createCheckoutSession, goToBillingPortal } from '@/lib/firestore'
import { Box, Button } from '@chakra-ui/react'
import { useState } from 'react'

const Account = () => {
  const auth = useAuth()
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false)
  const [isBillingLoading, setIsBillingLoading] = useState(false)
  return (
    <DashboardShell>
      {auth?.user && (
        <Box>
          <Button
            onClick={() => {
              setIsCheckoutLoading(true)
              createCheckoutSession(auth?.user?.uid!)
            }}
            isLoading={isCheckoutLoading}
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
          <Button
            onClick={() => {
              setIsBillingLoading(true)
              goToBillingPortal()
            }}
            isLoading={isBillingLoading}
            backgroundColor='gray.900'
            color='white'
            ml={4}
            fontWeight='medium'
            _hover={{ bg: 'gray.700' }}
            _active={{
              bg: 'gray.800',
              transform: 'scale(0.95)',
            }}
          >
            View Billing Portal
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
