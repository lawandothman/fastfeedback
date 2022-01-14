import {
	Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Heading,
} from '@chakra-ui/react'
import { ISite } from 'types'
import EditSiteModal from './EditSiteModal'
import NextChakraLink from './NextChakraLink'

interface SiteHeaderProps {
  site?: ISite
  siteId?: string
  route?: string
  isSiteOwner?: boolean
}

const SiteHeader = ({ site, siteId, route, isSiteOwner }: SiteHeaderProps) => {
  return (
    <Box mx={4}>
      <Breadcrumb>
        <BreadcrumbItem>
          <NextChakraLink href='/sites'>
            <BreadcrumbLink as='span'>Sites</BreadcrumbLink>
          </NextChakraLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink>{site?.name || '-'}</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      {site?.name && route && (
        <BreadcrumbItem>
          <NextChakraLink href={`/sites/${siteId}/${route}`}>
            <BreadcrumbLink as='span'>{route}</BreadcrumbLink>
          </NextChakraLink>
        </BreadcrumbItem>
      )}
      <Flex justifyContent='space-between'>
        <Heading mb={8}>{site?.name || '-'}</Heading>
        {isSiteOwner && siteId &&  (
          <EditSiteModal siteId={siteId} settings={site?.settings}>
            Edit Site
          </EditSiteModal>
        )}
      </Flex>
    </Box>
  )
}

export default SiteHeader
