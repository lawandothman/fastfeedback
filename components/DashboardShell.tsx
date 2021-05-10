import { ReactNode } from 'react'
import {
  Link,
  Flex,
  Stack,
  Avatar,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
} from '@chakra-ui/react'
import { useAuth } from '@/lib/auth'
import Logo from './Logo'

const DashboardShell = ({ children }: { children: ReactNode }) => {
  const auth = useAuth()

  return (
    <Flex flexDirection='column'>
      <Flex
        backgroundColor='white'
        justifyContent='space-between'
        alignItems='center'
        py={4}
        px={8}
      >
        <Stack spacing={4} isInline align='center'>
          <Logo color='black' boxSize='24px' />
          <Link to='/'>Feedback</Link>
          <Link to='/'>Sites</Link>
        </Stack>
        <Flex alignItems='center'>
          <Link to='/' mr={4}>
            Account
          </Link>
          <Avatar
            size='sm'
            src={auth?.user?.photoUrl ? auth.user.photoUrl : undefined}
          />
        </Flex>
      </Flex>

      <Flex backgroundColor='gray.100' p={8} height='100vh'>
        <Flex
          flexDirection='column'
          w='100%'
          ml='auto'
          mr='auto'
          maxWidth='800px'
        >
          <Breadcrumb>
            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink color='gray.700' fontSize='sm'>
                Sites
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <Heading color='black' mb={4}>
            Sites
          </Heading>
          {children}
        </Flex>
      </Flex>
    </Flex>
  )
}
export default DashboardShell
