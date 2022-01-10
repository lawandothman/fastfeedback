import { Box } from '@chakra-ui/react'
import { format, parseISO } from 'date-fns'
import React from 'react'
import { ISite } from 'types'
import {
  Table, Td, Th, Tr,
} from './Table'
import NextChakraLink from './NextChakraLink'

type SiteTableProps = {
  sites: ISite[]
}

const SiteTable: React.FC<SiteTableProps> = ({ sites }) => (
  <Box overflowX='scroll'>
    <Table w='full'>
      <thead>
        <Tr>
          <Th>Name</Th>
          <Th>Site Link</Th>
          <Th>Feedback Link</Th>
          <Th>Date Added</Th>
          <Th> </Th>
          <Th width='50px'> </Th>
        </Tr>
      </thead>
      <tbody>
        {sites.map((site) => (
          <Box as='tr' key={site.id}>
            <Td fontWeight='medium'>{site.name}</Td>
            <Td>
              <NextChakraLink isExternal href={site.url}>
                {site.url}
              </NextChakraLink>
            </Td>
            <Td>
              <NextChakraLink
                href='/p/[siteId]'
                as={`/p/${site.id}`}
                color='blue.500'
                fontWeight='medium'
              >
                View Feedback
              </NextChakraLink>
            </Td>
            <Td>{format(parseISO(site.createdAt), 'PPpp')}</Td>
          </Box>
        ))}
      </tbody>
    </Table>
  </Box>
)

export default SiteTable
