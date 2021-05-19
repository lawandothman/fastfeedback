import React, { useRef, useState } from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import {
  Box, Button, FormControl, FormLabel, Input,
} from '@chakra-ui/react'
import Feedback from '@/components/Feedback'
import { getAllFeedback, getAllSites } from '@/lib/firestore-admin'
import { IFeedback } from 'types'
import { useAuth } from '@/lib/auth'
import { useRouter } from 'next/router'
import { createFeedback } from '@/lib/firestore'

export const getStaticProps: GetStaticProps = async (context) => {
  const siteId = typeof context.params?.siteId === 'string' ? context.params?.siteId : ''
  const { feedback } = await getAllFeedback(siteId)
  return {
    props: {
      initialFeedback: feedback,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { sites } = await getAllSites()

  const paths = sites!.map((site) => ({
    params: {
      siteId: site.id,
    },
  }))

  return {
    paths,
    fallback: true,
  }
}

interface SiteFeedbackProps {
  initialFeedback: IFeedback[]
}

const SiteFeedback: React.FC<SiteFeedbackProps> = ({ initialFeedback }) => {
  const auth = useAuth()
  const router = useRouter()
  const inputEl = useRef<HTMLInputElement>(null)
  const [allFeedback, setAllFeedback] = useState<IFeedback[]>(initialFeedback)

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    const siteId = typeof router.query.siteId === 'string' ? router.query.siteId : ''
    const newFeedback: IFeedback = {
      author: auth?.user?.name,
      authorId: auth?.user?.uid,
      text: inputEl.current?.value,
      createdAt: new Date().toISOString(),
      provider: auth?.user?.provider,
      status: 'pending',
      rating: 4,
      siteId,
    }
    setAllFeedback([newFeedback, ...allFeedback])
    createFeedback(newFeedback)
  }

  return (
    <Box
      display='flex'
      flexDirection='column'
      width='full'
      maxWidth='700px'
      margin='0 auto'
    >
      <Box as='form' onSubmit={onSubmit}>
        <FormControl id='comment' my={8}>
          <FormLabel>Comment</FormLabel>
          <Input ref={inputEl} type='comment' id='comment' />
          <Button mt={2} type='submit' fontWeight='medium'>
            Add Comment
          </Button>
        </FormControl>
      </Box>
      {allFeedback.map((feedback) => (
        <Feedback key={feedback.id} {...feedback} />
      ))}
    </Box>
  )
}

export default SiteFeedback
