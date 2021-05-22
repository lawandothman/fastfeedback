import { Box, Code, Switch } from '@chakra-ui/react'
import React from 'react'
import { IFeedback } from 'types'
import {
  Table, Td, Th, Tr,
} from './Table'
import RemoveButton from './RemoveButton'

type FeedbackTableProps = {
  feedback: IFeedback[]
}

const FeedbackTable: React.FC<FeedbackTableProps> = (props) => (
  <Table>
    <thead>
      <Tr>
        <Th>Name</Th>
        <Th>Feedback</Th>
        <Th>Route</Th>
        <Th>Visible</Th>
        <Th> </Th>
      </Tr>
    </thead>
    <tbody>
      {props.feedback.map((feedback) => (
        <Box as='tr' key={feedback.id}>
          <Td fontWeight='medium'>{feedback.author}</Td>
          <Td>{feedback.text}</Td>
          <Td>
            <Code>someroute.com</Code>
          </Td>
          <Td>
            <Switch
              colorScheme='green'
              defaultChecked={feedback.status === 'active'}
            />
          </Td>
          <Td>
            <RemoveButton />
          </Td>
        </Box>
      ))}
    </tbody>
  </Table>
)

export default FeedbackTable
