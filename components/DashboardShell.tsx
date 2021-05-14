import React from 'react'
import {
  Link,
  Flex,
  Avatar,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  Box,
  Button,
} from '@chakra-ui/react'
import { useAuth } from '@/lib/auth'
import Logo from './Logo'
import AddSiteModal from './AddSiteModal'

const DashboardShell: React.FC = ({ children }) => {
  const auth = useAuth()

  return (
    <Box backgroundColor='gray.100' h='100vh'>
      <Flex backgroundColor='white' mb={16} w='full'>
        <Flex
          justifyContent='space-between'
          alignItems='center'
          pt={4}
          pb={4}
          maxW='1250px'
          margin='0 auto'
          w='full'
          px={8}
        >
          <Flex>
            <Logo color='black' boxSize='24px' mr={8} />
            <Link mr={4} to='/'>
              Sites
            </Link>
            <Link to='/'>Feedback</Link>
          </Flex>
          <Flex justifyContent='center' alignItems='center'>
            {auth?.user && (
              <Button variant='ghost' mr={2} onClick={() => auth?.signout()}>
                Log Out
              </Button>
            )}
            <Avatar
              size='sm'
              src={auth?.user?.photoUrl ? auth.user.photoUrl : undefined}
            />
          </Flex>
        </Flex>
      </Flex>

      <Flex margin='0 auto' direction='column' maxW='1250px' px={8}>
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink>Sites</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <Flex justifyContent='space-between'>
          <Heading mb={4}>Sites</Heading>
          <AddSiteModal>+ Add Site</AddSiteModal>
        </Flex>
        {children}
      </Flex>
    </Box>
  )
}
export default DashboardShell
