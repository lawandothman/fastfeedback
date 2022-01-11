import useSwr from 'swr'
import EmptyState from '@/components/EmptyState'
import SiteTableSkeleton from '@/components/SiteTableSkeleton'
import DashboardShell from '@/components/DashboardShell'
import fetcher from '@/util/fetcher'
import SiteTable from '@/components/SiteTable'
import { useAuth } from '@/lib/auth'
import SiteTableHeader from '@/components/SiteTableHeader'
import UpgradeEmptyState from '@/components/UpgradeEmptyState'
import Page from '@/components/Page'

const Dashboard = () => {
  const auth = useAuth()
  const { data } = useSwr(
    auth?.user ? ['/api/sites', auth?.user.token] : null,
    fetcher
  )
  const isPaidAccount = auth?.user?.stripeRole

  if (!data) {
    return (
      <DashboardShell>
        <SiteTableHeader />
        <SiteTableSkeleton />
      </DashboardShell>
    )
  }

  if (data?.sites?.length) {
    return (
      <DashboardShell>
        <SiteTableHeader />
        <SiteTable sites={data.sites} />
      </DashboardShell>
    )
  }

  return (
    <DashboardShell>
      <SiteTableHeader isPaidAccount={isPaidAccount} />
      {isPaidAccount ? <EmptyState /> : <UpgradeEmptyState />}
    </DashboardShell>
  )
}

const DashboradPage = () => {
  return (
    <Page name='Dashboard' path='/sites'>
      <Dashboard />
    </Page>
  )
}

export default DashboradPage
