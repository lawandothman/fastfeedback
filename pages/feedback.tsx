import useSwr from 'swr'
import DashboardShell from '@/components/DashboardShell'
import fetcher from '@/util/fetcher'
import { useAuth } from '@/lib/auth'
import FeedbackTable from '@/components/FeedbackTable'
import FeedbackTableHeader from '@/components/FeedbackTableHeader'
import FeedbackTableSkeleton from '@/components/FeedbackTableSkeleton'
import Page from '@/components/Page'
import FeedbackEmptyState from '@/components/FeedbackEmptyState'

const MyFeedback = () => {
  const auth = useAuth()
  const { data } = useSwr(
    auth?.user ? ['/api/feedback', auth?.user.token] : null,
    fetcher
  )

  if (!data) {
    return (
      <DashboardShell>
        <FeedbackTableHeader />
        <FeedbackTableSkeleton />
      </DashboardShell>
    )
  }

  return (
    <DashboardShell>
      <FeedbackTableHeader />
      {data?.feedback?.length ? (
        <FeedbackTable feedback={data.feedback} />
      ) : (
        <FeedbackEmptyState />
      )}
    </DashboardShell>
  )
}

const MyFeedbackPage = () => {
  return (
    <Page name='My Feedback' path='/feedback'>
      <MyFeedback />
    </Page>
  )
}

export default MyFeedbackPage
