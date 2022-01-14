import React from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import { Box } from '@chakra-ui/react'
import Feedback from '@/components/Feedback'
import { getAllFeedback, getAllSites, getSite } from '@/lib/firestore-admin'
import { IFeedback } from 'types'
import { useRouter } from 'next/router'
import FeedbackLink from '@/components/FeedbackLink'

export const getStaticProps: GetStaticProps = async (context) => {
  console.log(context?.params?.site)
  const [siteId, route] = context?.params?.site as string[]
  const { feedback } = await getAllFeedback(siteId, route)
  const { site } = await getSite(siteId)
  return {
    props: {
      initialFeedback: feedback,
      site,
    },
    revalidate: 1,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const { sites } = await getAllSites()

    const paths = sites.map((site) => ({
      params: {
        site: [site.id!.toString()],
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
const EmbeddedFeedbackPage: React.FC<SiteFeedbackProps> = ({
  initialFeedback,
}) => {
  const router = useRouter()

  return (
    <Box display='flex' flexDirection='column' width='full'>
      <FeedbackLink siteId={router.query.siteId as string} />
      {initialFeedback?.length ? (
        initialFeedback.map((feedback, index) => (
          <Feedback
            key={feedback.id}
            isLast={index === initialFeedback.length}
            {...feedback}
          />
        ))
      ) : (
        <Box>There are no comments for this site.</Box>
      )}
    </Box>
  )
}

export default EmbeddedFeedbackPage
