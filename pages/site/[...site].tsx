import React, { useEffect, useRef, useState } from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import { Box, Button, FormControl, FormLabel, Input } from '@chakra-ui/react'
import Feedback from '@/components/Feedback'
import { getAllFeedback, getAllSites, getSite } from '@/lib/firestore-admin'
import { IFeedback, ISite } from 'types'
import { useAuth } from '@/lib/auth'
import { useRouter } from 'next/router'
import { createFeedback } from '@/lib/firestore'
import DashboardShell from '@/components/DashboardShell'
import LoginButtons from '@/components/LoginButtons'
import SiteHeader from '@/components/SiteHeader'

export const getStaticProps: GetStaticProps = async (context) => {
  const [siteId, route] = context?.params?.site as string[]
  const { feedback } = await getAllFeedback(siteId, route)
  const {site} = await getSite(siteId)
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
  initialFeedback: IFeedback[],
  site: ISite
}

const SiteFeedback: React.FC<SiteFeedbackProps> = ({ initialFeedback, site }) => {
  const auth = useAuth()
  const router = useRouter()
  const inputEl = useRef<HTMLInputElement>(null)
  const [allFeedback, setAllFeedback] = useState<IFeedback[]>(initialFeedback)
  const [siteId, route] = router.query.site as string[]


  useEffect(() => {
    setAllFeedback(initialFeedback)
  },[initialFeedback])

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    const newFeedback: IFeedback = {
      siteId,
      route: route || '/',
      author: auth?.user?.name,
      authorId: auth?.user?.uid,
      text: inputEl.current?.value,
      createdAt: new Date().toISOString(),
      provider: auth?.user?.provider,
      status: 'pending',
      rating: 4,
    }
    inputEl.current!.value = ''
    const { id } = createFeedback(newFeedback)
    setAllFeedback([{ id, ...newFeedback }, ...allFeedback])
  }

  const LoginOrLeaveFeedback = () => {
    if(auth?.user) {
      return (
        <Button
          type='submit'
          mt={4}
          fontWeight='medium'
          backgroundColor='gray.900'
          color='white'
          _hover={{
            bg: 'gray.700',
          }}
          _active={{
            bg: 'gray.800',
            transform: 'scale(0.95)',
          }}
          isDisabled={router.isFallback}
        >
          Leave Feedback
        </Button>
      )
    } else {
      return <LoginButtons />
    }
  }

  return (
    <DashboardShell>
      <SiteHeader
        isSiteOwner={true}
        siteId={site.id}
        site={site}
        route={route}
      />
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
            {!auth?.loading && <LoginOrLeaveFeedback />}
          </FormControl>
        </Box>
        {allFeedback &&
          allFeedback.map((feedback, index) => (
            <Feedback
              key={feedback.id}
              isLast={index === allFeedback.length}
              {...feedback}
            />
          ))}
      </Box>
    </DashboardShell>
  )
}

export default SiteFeedback
