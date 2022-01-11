import React from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import { Box } from '@chakra-ui/react'
import Feedback from '@/components/Feedback'
import { getAllFeedback, getAllSites } from '@/lib/firestore-admin'
import { IFeedback } from 'types'
import { useRouter } from 'next/router'
import FeedbackLink from '@/components/FeedbackLink'

export const getStaticProps: GetStaticProps = async (context) => {
  const siteId =
    typeof context.params?.siteId === 'string' ? context.params?.siteId : ''
  const { feedback } = await getAllFeedback(siteId)
  return {
    props: {
      initialFeedback: feedback,
    },
    revalidate: 1,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const { sites } = await getAllSites()

    const paths = sites.map((site) => ({
      params: {
        siteId: site.id,
      },
    }))

    return {
      paths,
      fallback: true,
    }
  } catch (error) {
    return {
      paths: [],
      fallback: false,
    }
  }
}

interface SiteFeedbackProps {
  initialFeedback: IFeedback[]
}
const EmbeddedFeedbackPage: React.FC<SiteFeedbackProps> = ({ initialFeedback }) => {
  const router = useRouter()

  return (
      <Box
        display='flex'
        flexDirection='column'
        width='full'
      >
				<FeedbackLink siteId={router.query.siteId as string} />
        {initialFeedback &&
          initialFeedback.map((feedback) => (
            <Feedback key={feedback.id} {...feedback} />
          ))}
      </Box>
  )
}

export default EmbeddedFeedbackPage
