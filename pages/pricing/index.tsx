import { IconCheck, IconX } from '@tabler/icons-react'
import Card1 from './partials/card1'

const pricingContent = [
  {
    subtitle: 'Bsic Plan',
    price: 9.99,
    suffix: '/mo',
    href: '/basic',
    labels: [
      {
        label: 'lorem ipsum, lorem ipsum ',
        remark: 'check',
      },
      {
        label: 'lorem ipsum, lorem ipsum ',
        remark: 'check',
      },
      {
        label: 'lorem ipsum, lorem ipsum ',
        remark: 'x',
      },
      {
        label: 'lorem ipsum, lorem ipsum ',
        remark: 'x',
      },
      {
        label: 'lorem ipsum, lorem ipsum ',
        remark: 'x',
      },
    ],
  },
  {
    subtitle: 'Standard',
    price: 20.99,
    suffix: '/mo',
    href: '/standard',
    labels: [
      {
        label: 'lorem ipsum, lorem ipsum ',
        remark: 'check',
      },
      {
        label: 'lorem ipsum, lorem ipsum ',
        remark: 'check',
      },
      {
        label: 'lorem ipsum, lorem ipsum ',
        remark: 'check',
      },
      {
        label: 'lorem ipsum, lorem ipsum ',
        remark: 'x',
      },
      {
        label: 'lorem ipsum, lorem ipsum ',
        remark: 'x',
      },
    ],
  },
  {
    subtitle: 'Premium',
    price: 39.99,
    suffix: '/mo',
    href: '/premium',
    labels: [
      {
        label: 'lorem ipsum, lorem ipsum ',
        remark: 'check',
      },
      {
        label: 'lorem ipsum, lorem ipsum ',
        remark: 'check',
      },
      {
        label: 'lorem ipsum, lorem ipsum ',
        remark: 'check',
      },
      {
        label: 'lorem ipsum, lorem ipsum ',
        remark: 'check',
      },
      {
        label: 'lorem ipsum, lorem ipsum ',
        remark: 'check',
      },
    ],
  },
]

export default function Pricing() {
  function renderRemarkIcon(remark: string): import('react').ReactNode {
    if (remark === 'check') {
      return (
        <div className="text-green-500">
          <IconCheck />
        </div>
      )
    } else if (remark === 'x') {
      return (
        <div className="text-red-500">
          <IconX />
        </div>
      )
    }
    return null
  }

  return (
    <div className="grid grid-cols-3 gap-10 p-4">
      {pricingContent.map((plan, index) => (
        <Card1
          key={index}
          subtitle={plan.subtitle}
          dollar="$"
          price={plan.price}
          suffix={plan.suffix}
          button="Buy Now"
          href={plan.href}
        >
          {plan.labels.map((label) => (
            <>
              <span className="col-span-1">
                {renderRemarkIcon(label.remark)}
              </span>
              <p className="col-span-3">{label.label}</p>
            </>
          ))}
        </Card1>
      ))}
    </div>
  )
}
