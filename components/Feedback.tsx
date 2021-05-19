import {
  Box, Divider, Heading, Text,
} from '@chakra-ui/react'
import { format, parseISO } from 'date-fns'

interface FeedbackProps {
  author?: string | null
  text?: string
  createdAt: string
}

const Feedback: React.FC<FeedbackProps> = ({ author, text, createdAt }) => (
  <Box borderRadius={4} maxWidth='700px' w='full'>
    <Heading size='sm' as='h3' mb={0} color='gray.900' fontWeight='medium'>
      {author}
    </Heading>
    <Text color='gray.900' mb={4} fontSize='xs'>
      {format(parseISO(createdAt), 'PPpp')}
    </Text>
    <Text color='gray.900'>{text}</Text>
    <Divider borderColor='gray.200' backgroundColor='gray.200' mt={8} mb={8} />
  </Box>
)

export default Feedback
