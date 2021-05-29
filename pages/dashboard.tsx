import useSwr from 'swr'
import EmptyState from '@/components/EmptyState'
import SiteTableSkeleton from '@/components/SiteTableSkeleton'
import DashboardShell from '@/components/DashboardShell'
import fetcher from '@/util/fetcher'
import SiteTable from '@/components/SiteTable'
import { useAuth } from '@/lib/auth'
import SiteTableHeader from '@/components/SiteTableHeader'

const Dashboard = () => {
  const auth = useAuth()
  const { data } = useSwr(
    auth?.user ? ['/api/sites', auth?.user.token] : null,
    fetcher,
  )

  if (!data) {
    return (
      <DashboardShell>
        <SiteTableHeader />
        <SiteTableSkeleton />
      </DashboardShell>
    )
  }

  return (
    <DashboardShell>
      <SiteTableHeader />
      {data?.sites?.length ? <SiteTable sites={data.sites} /> : <EmptyState />}
    </DashboardShell>
  )
}

export default Dashboard
