import { Box, Code, Switch } from '@chakra-ui/react'
import React from 'react'
import { IFeedback } from 'types'
import { Td } from './Table'
import DeleteFeedbackButton from './DeleteFeedbackButton'
import { updateFeedback } from '@/lib/firestore'
import { mutate } from 'swr'
import { useAuth } from '@/lib/auth'

type FeedbackTableProps = {
  feedback: IFeedback
}

const FeedbackRow: React.FC<FeedbackTableProps> = ({ feedback }) => {
  const auth = useAuth()
  const { id, author, text, route, status } = feedback
  const isChecked = status === 'active'

  const toggleFeedback = async () => {
    await updateFeedback(id!, { status: isChecked ? 'pending' : 'active' })
    mutate(['/api/feedback', auth?.user?.token])
  }

  return (
    <Box as='tr' key={id}>
      <Td fontWeight='medium'>{author}</Td>
      <Td>{text}</Td>
      <Td>
        <Code>{route || '/'}</Code>
      </Td>
      <Td>
        <Switch
          colorScheme='green'
          onChange={toggleFeedback}
          isChecked={isChecked}
        />
      </Td>
      <Td>
        <DeleteFeedbackButton feedbackId={id} />
      </Td>
    </Box>
  )
}

export default FeedbackRow
