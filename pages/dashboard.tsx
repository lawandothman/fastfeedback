import useSwr from 'swr'
// import { useAuth } from '@/lib/auth'
import EmptyState from '@/components/EmptyState'
import SiteTableSkeleton from '@/components/SiteTableSkeleton'
import DashboardShell from '@/components/DashboardShell'
import fetcher from '@/util/fetcher'
import SiteTable from '@/components/SiteTable'

const Dashboard = () => {
  // const auth = useAuth()
  const { data } = useSwr('/api/sites', fetcher)

  console.log(data)

  return (
    <DashboardShell>
      {!data && <SiteTableSkeleton />}
      {data?.sites ? <SiteTable sites={data.sites} /> : <EmptyState />}
    </DashboardShell>
  )
}

export default Dashboard
