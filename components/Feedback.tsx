import { Box, Divider, Flex, Heading, Icon, Text } from '@chakra-ui/react'
import { format, parseISO } from 'date-fns'
import { ISite } from 'types'
import { GitHub, Google } from './Icons'

interface FeedbackProps extends Partial<ISite> {
  author?: string | null
  text?: string
  createdAt: string
  provider?: string
  isLast: boolean
}

const Feedback: React.FC<FeedbackProps> = ({
  author,
  text,
  createdAt,
  provider,
  isLast,
  settings,
}) => {
  return (
    <Box borderRadius={4} maxWidth='700px' w='full'>
      <Flex align='center'>
        <Heading size='sm' as='h3' mb={0} color='gray.900' fontWeight='medium'>
          {author}
          {settings?.icons && (
            <Icon
              as={provider === 'google.com' ? Google : GitHub}
              boxSize='13px'
              ml='6px'
            />
          )}
        </Heading>
      </Flex>
      {settings?.timestamp && (
        <Text color='gray.900' mb={4} fontSize='xs'>
          {format(parseISO(createdAt), 'PPpp')}
        </Text>
      )}
      <Text color='gray.900'>{text}</Text>
      {!isLast && (
        <Divider
          borderColor='gray.200'
          backgroundColor='gray.200'
          mt={8}
          mb={8}
        />
      )}
    </Box>
  )
}

export default Feedback
