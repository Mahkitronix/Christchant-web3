import { CenterMenuItems } from '@/components/layouts/center/CenterMenuItems'
import { IconPackage, IconTruck, IconCurrencyDollar } from '@tabler/icons-react'
import CenterLayout from '@/components/layouts/center/CenterLayout'
import { WithUserAuthPage } from '@/middleware/WithUserAuthPage'
import UiCard, { UiCardBody } from '@/components/_sharable/UiCard'
import { selectDarkMode } from '@/store/slices/ui.slice'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'

const DashboardCard = ({
  label,
  value,
  icon: Icon,
}: {
  label: string
  value: string | number
  icon: any
}) => {
  const isDarkMode = useSelector(selectDarkMode)

  return (
    <UiCard
      variant="outline"
      hover
      className={`w-full ${isDarkMode ? 'bg-gray-800 text-white dark' : 'bg-white text-black'}`}
    >
      <UiCardBody
        className={`flex flex-row items-center gap-4 py-6 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
      >
        <div
          className={`rounded-xl ${isDarkMode ? 'bg-primary/20' : 'bg-primary/5'} p-3 text-primary`}
        >
          <Icon size={28} stroke={1.5} />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">{label}</p>
          <p className="text-2xl font-semibold">{value}</p>
        </div>
      </UiCardBody>
    </UiCard>
  )
}

const CenterDashboard = () => {
  const { user } = useSelector((state: RootState) => state.auth) as any
  const isAdmin = user?.userType === 'admin' || user?.userType === 'superAdmin'
  const dashboardTitle = isAdmin ? 'Admin Dashboard' : 'Admin Dashboard'
  const welcomeMessage = `Welcome back, ${user?.firstName || (isAdmin ? 'Admin' : 'Admin')}!`

  return (
    <CenterLayout
      pageTitle={dashboardTitle}
      pageDescription={welcomeMessage}
      menuItems={CenterMenuItems}
      breadcrumbs={[]}
    >
      <div className="py-4">
        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="w-full">
            <DashboardCard label={'Total Songs'} value={0} icon={IconPackage} />
          </div>
          <div className="w-full">
            <DashboardCard
              label={isAdmin ? 'Total Orders' : 'Orders Pending'}
              value={0}
              icon={IconTruck}
            />
          </div>
          <div className="w-full">
            <DashboardCard
              label="Total Revenue"
              value="$0.00"
              icon={IconCurrencyDollar}
            />
          </div>
        </div>
      </div>
    </CenterLayout>
  )
}

export default WithUserAuthPage(CenterDashboard)
