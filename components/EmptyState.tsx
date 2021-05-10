import React from 'react'
import {
  Heading, Text, Button, Flex,
} from '@chakra-ui/react'
import DashboardShell from './DashboardShell'

const EmptyState = () => (
  <DashboardShell>
    <Flex
      width='100%'
      backgroundColor='white'
      borderRadius='8px'
      p={16}
      justify='center'
      align='center'
      direction='column'
    >
      <Heading size='md' mb={2}>You haven&apos;t added any sites.</Heading>
      <Text mb={4}>Let&apos;s get started</Text>
      <Button fontWeight='medium' maxW='200px' variant='solid' size='md'>
        Add Your First Site
      </Button>
    </Flex>
  </DashboardShell>
)
export default EmptyState
