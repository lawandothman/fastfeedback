import { Box, Link } from '@chakra-ui/react'
import { format, parseISO } from 'date-fns'
import React from 'react'
import { ISite } from 'types'
import {
  Table, Td, Th, Tr,
} from './Table'

interface Props {
  sites: ISite[]
}

const SiteTable:React.FC<Props> = ({ sites }) => (
  <Table>
    <thead>
      <Tr>
        <Th>Name</Th>
        <Th>Site Link</Th>
        <Th>Feedback Link</Th>
        <Th>Date Added</Th>
        <Th>{' '}</Th>
      </Tr>
    </thead>
    <tbody>
      {sites.map((site) => (
        <Box as='tr' key={site.url}>
          <Td fontWeight='medium'>
            {site.name}
          </Td>
          <Td>
            {site.url}
          </Td>
          <Td>
            <Link to='/'>View Feedback</Link>
          </Td>
          <Td>
            {format(parseISO(site.createdAt), 'PPpp')}
          </Td>
        </Box>
      ))}
    </tbody>
  </Table>
)

export default SiteTable
