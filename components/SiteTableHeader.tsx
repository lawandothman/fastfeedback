import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Heading,
} from '@chakra-ui/react'
import AddSiteModal from './AddSiteModal'

const SiteTableHeader = ({ isPaidAccount }: { isPaidAccount?: string }) => (
  <>
    <Breadcrumb>
      <BreadcrumbItem>
        <BreadcrumbLink>Sites</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
    <Flex justifyContent='space-between'>
      <Heading mb={4}>Sites</Heading>
      {isPaidAccount && <AddSiteModal>+ Add Site</AddSiteModal>}
    </Flex>
  </>
)

export default SiteTableHeader
