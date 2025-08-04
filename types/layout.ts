export interface AdminMenuItem {
  icon?: any
  label: string
  href?: string
  subItems?: Array<{
    icon: any
    label: string
    href: string
  }>
  type?: 'divider'
}
