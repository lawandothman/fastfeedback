import { Flex, Link } from '@chakra-ui/react'
import React from 'react'
import NextChakraLink from './NextChakraLink'

interface FeedbackLinkProps {
  siteId: string
}

const FeedbackLink: React.FC<FeedbackLinkProps> = ({ siteId }) => (
  <Flex justifyContent='space-between' mb={8} width='full' mt={1}>
    <NextChakraLink fontWeight='bold' fontSize='sm' href={`/p/${siteId}`}>
      Leave a comment →
    </NextChakraLink>
    <Link fontSize='xs' color='blackAlpha.500' href='/'>
      Powered by Fast Feedback
    </Link>
  </Flex>
)

export default FeedbackLink
