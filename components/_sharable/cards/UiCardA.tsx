import UiCard, { UiCardBody } from '@/components/_sharable/UiCard'
import { selectDarkMode } from '@/store/slices/ui.slice'
import { useSelector } from 'react-redux'

const UiCardA = ({
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

export default UiCardA
