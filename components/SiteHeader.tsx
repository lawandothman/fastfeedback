import {
	Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Heading,
} from '@chakra-ui/react'
import NextChakraLink from './NextChakraLink'

const SiteHeader = ({ siteName }: { siteName?: string }) => (
  <Box mx={4}>
    <Breadcrumb>
      <BreadcrumbItem>
      <NextChakraLink href='/sites'>
        <BreadcrumbLink>Sites</BreadcrumbLink>
      </NextChakraLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink>{siteName || '-'}</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
    <Flex justifyContent='space-between'>
      <Heading mb={8}>{siteName || '-'}</Heading>
    </Flex>
  </Box>
)

export default SiteHeader
