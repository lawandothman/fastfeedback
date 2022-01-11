import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Heading,
} from '@chakra-ui/react'

const FeedbackTableHeader = () => (
  <>
    <Breadcrumb>
      <BreadcrumbItem>
        <BreadcrumbLink>Feedback</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
    <Flex justifyContent='space-between'>
      <Heading mb={4}>All Feedback</Heading>
    </Flex>
  </>
)

export default FeedbackTableHeader
