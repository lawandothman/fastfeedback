import { Box, Button, Flex, Stack, Text } from '@chakra-ui/react'
import { useAuth } from '@/lib/auth'
import { Logo } from '@/components/Icons'
import { GetStaticProps } from 'next'
import { getAllFeedback } from '@/lib/firestore-admin'
import { IFeedback } from 'types'
import React, { useEffect } from 'react'
import FeedbackLink from '@/components/FeedbackLink'
import Feedback from '@/components/Feedback'
import Cookies from 'js-cookie'
import Router from 'next/router'
import LoginButtons from '@/components/LoginButtons'

const SITE_ID = '5PkJdYIjbOSatH4B8jos'

export const getStaticProps: GetStaticProps = async () => {
  const { feedback } = await getAllFeedback(SITE_ID)
  return {
    props: {
      allFeedback: feedback,
    },
    revalidate: 1,
  }
}

interface HomeProps {
  allFeedback: IFeedback[] | undefined
}

const Home: React.FC<HomeProps> = ({ allFeedback }) => {
  const auth = useAuth()
  const cookie = Cookies.get('fast-feedback-auth')
  console.log(cookie)

  useEffect(() => {
    if (cookie) {
      Router.push('/sites')
    }
  }, [cookie])

  return (
    <>
      <Box bg='gray.100' py={16}>
        <Flex as='main' direction='column' maxW='700px' margin='0 auto'>
          <Logo color='black' boxSize='48px' mb={2} />
          <Text mb={4} fontSize='lg' py={4}>
            <Text as='span' fontWeight='bold' display='inline'>
              Fast Feedback
            </Text>
            <br />
            The easiest way to add comments or reviews to your static site.
          </Text>
          {auth?.user ? (
            <Button
              as='a'
              href='/sites'
              mt={4}
              maxW='200px'
              size='lg'
              backgroundColor='gray.900'
              color='white'
              variant='outline'
              fontWeight='medium'
              _hover={{ bg: 'gray.700' }}
              _active={{
                bg: 'gray.800',
                transform: 'scale(0.95)',
              }}
            >
              View Dashboard
            </Button>
          ) : (
            <LoginButtons />
          )}
        </Flex>
      </Box>
      <Box
        display='flex'
        flexDirection='column'
        width='full'
        maxWidth='700px'
        margin='0 auto'
        mt={8}
      >
        <FeedbackLink siteId={SITE_ID} />
        {allFeedback?.map((feedback) => (
          <Feedback key={feedback.id} {...feedback} />
        ))}
      </Box>
    </>
  )
}

export default Home
