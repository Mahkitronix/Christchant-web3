import { Tooltip } from '@heroui/react'

export default function UiTooltip({
  children,
  label,
}: {
  children: React.ReactNode
  label: string
}) {
  return (
    <Tooltip
      content={label}
      placement="right"
      showArrow={true}
      motionProps={{
        variants: {
          enter: {
            opacity: 1,
            scale: [0.9, 1.1, 1],
            y: [2, -4, 0],
            transition: {
              duration: 0.4,
              ease: [0.34, 1.56, 0.64, 1],
              scale: {
                times: [0, 0.6, 1],
              },
              y: {
                times: [0, 0.6, 1],
              },
            },
          },
          exit: {
            opacity: 0,
            scale: 0.95,
            transition: { duration: 0.2, ease: 'easeIn' },
          },
        },
      }}
    >
      {children}
    </Tooltip>
  )
}
