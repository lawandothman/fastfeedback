import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Heading,
} from '@chakra-ui/react'
import AddSiteModal from './AddSiteModal'

const SiteTableHeader = () => (
  <>
    <Breadcrumb>
      <BreadcrumbItem>
        <BreadcrumbLink>Sites</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
    <Flex justifyContent='space-between'>
      <Heading mb={4}>Sites</Heading>
      <AddSiteModal>+ Add Site</AddSiteModal>
    </Flex>
  </>
)

export default SiteTableHeader
