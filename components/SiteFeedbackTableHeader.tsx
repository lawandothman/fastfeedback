import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Heading,
} from '@chakra-ui/react'
import NextChakraLink from './NextChakraLink'

const SiteFeedbackTableHeader = ({ siteName }: { siteName?: string }) => (
  <>
    <Breadcrumb>
      <BreadcrumbItem>
      <NextChakraLink href='/feedback'>
        <BreadcrumbLink>Feedback</BreadcrumbLink>
      </NextChakraLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink>{siteName || '-'}</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
    <Flex justifyContent='space-between'>
      <Heading mb={4}>{siteName || '-'}</Heading>
    </Flex>
  </>
)

export default SiteFeedbackTableHeader
