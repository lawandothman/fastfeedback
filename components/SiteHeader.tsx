import {
	Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Heading,
} from '@chakra-ui/react'
import NextChakraLink from './NextChakraLink'

interface SiteHeaderProps {
  siteName?: string
  siteId?: string
  route?: string
  isSiteOwner?: boolean
}

const SiteHeader = ({ siteName, siteId, route }: SiteHeaderProps) => {
  return (
    <Box mx={4}>
      <Breadcrumb>
        <BreadcrumbItem>
          <NextChakraLink href='/sites'>
            <BreadcrumbLink as='span'>Sites</BreadcrumbLink>
          </NextChakraLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink>{siteName || '-'}</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      {siteName && route && (
        <BreadcrumbItem>
          <NextChakraLink href={`/sites/${siteId}/${route}`}>
            <BreadcrumbLink as='span'>{route}</BreadcrumbLink>
          </NextChakraLink>
        </BreadcrumbItem>
      )}
      <Flex justifyContent='space-between'>
        <Heading mb={8}>{siteName || '-'}</Heading>
      </Flex>
    </Box>
  )
}

export default SiteHeader
