import { Flex, Link } from '@chakra-ui/react'
import React from 'react'

interface FeedbackLinkProps {
  siteId: string
}

const FeedbackLink:React.FC<FeedbackLinkProps> = ({ siteId }) => (
  <Flex justifyContent='space-between' mb={8} width='full' mt={1}>
    <Link fontWeight='bold' fontSize='sm' href={`/p/${siteId}`}>
      Leave a comment →
    </Link>
    <Link fontSize='xs' color='blackAlpha.500' href='/'>
      Powered by Fast Feedback
    </Link>
  </Flex>
)

export default FeedbackLink
