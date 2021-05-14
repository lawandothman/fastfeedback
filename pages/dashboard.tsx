import { useAuth } from '@/lib/auth'
import EmptyState from '@/components/EmptyState'
import SiteTableSkeleton from '@/components/SiteTableSkeleton'
import DashboardShell from '@/components/DashboardShell'

const Dashboard = () => {
  const auth = useAuth()

  return (
    <DashboardShell>
      {!auth?.user ? <SiteTableSkeleton /> : <EmptyState />}
    </DashboardShell>
  )
}

export default Dashboard
