import React from 'react'
import { IFeedback } from 'types'
import { Table, Th, Tr } from './Table'
import FeedbackRow from './FeedbackRow'

type FeedbackTableProps = {
  feedback: IFeedback[]
}

const FeedbackTable: React.FC<FeedbackTableProps> = (props) => {
  return (
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
          <FeedbackRow feedback={feedback} key={feedback.id} />
        ))}
      </tbody>
    </Table>
  )
}

export default FeedbackTable
