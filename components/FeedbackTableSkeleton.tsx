import { Box, Skeleton } from '@chakra-ui/react'
import React from 'react'
import {
  Table, Td, Th, Tr,
} from './Table'

type SkeletonRowProps = {
  width: string
}

const SkeletonRow:React.FC<SkeletonRowProps> = ({ width }) => (
  <Box as='tr'>
    {[1, 2, 3, 4].map((x) => (
      <Td key={x}>
        <Skeleton height='10px' w={width} my={4} />
      </Td>
    ))}
  </Box>
)

const FeedbackTableSkeleton = () => (
  <Table>
    <thead>
      <Tr>
        <Th>Name</Th>
        <Th>Feedback</Th>
        <Th>Route</Th>
        <Th>Visible</Th>
        <Th width='50px'>{' '}</Th>
      </Tr>
    </thead>
    <tbody>
      <SkeletonRow width='75px' />
      <SkeletonRow width='125px' />
      <SkeletonRow width='50px' />
      <SkeletonRow width='100px' />
      <SkeletonRow width='75px' />
    </tbody>
  </Table>
)

export default FeedbackTableSkeleton
