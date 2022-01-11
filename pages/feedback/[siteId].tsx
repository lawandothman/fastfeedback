import useSwr from 'swr'
import DashboardShell from '@/components/DashboardShell'
import fetcher from '@/util/fetcher'
import { useAuth } from '@/lib/auth'
import FeedbackTable from '@/components/FeedbackTable'
import FeedbackTableSkeleton from '@/components/FeedbackTableSkeleton'
import Page from '@/components/Page'
import FeedbackEmptyState from '@/components/FeedbackEmptyState'
import { useRouter } from 'next/router'
import SiteFeedbackTableHeader from '@/components/SiteFeedbackTableHeader'

const SiteFeedback = () => {
  const auth = useAuth()
	const { query } = useRouter()
  const { data } = useSwr(
    auth?.user ? [`/api/feedback/${query.siteId}`, auth?.user.token] : null,
    fetcher
  )

  if (!data) {
    return (
      <DashboardShell>
        <SiteFeedbackTableHeader />
        <FeedbackTableSkeleton />
      </DashboardShell>
    )
  }

  return (
    <DashboardShell>
      <SiteFeedbackTableHeader siteName={data.site.name} />
      {data?.feedback?.length ? (
        <FeedbackTable feedback={data.feedback} />
      ) : (
        <FeedbackEmptyState />
      )}
    </DashboardShell>
  )
}

const SiteFeedbackPage = () => {
  return (
    <Page name='My Feedback' path='/feedback'>
      <SiteFeedback />
    </Page>
  )
}

export default SiteFeedbackPage
