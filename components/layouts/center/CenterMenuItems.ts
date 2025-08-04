import {
  IconDashboard,
  IconMusic,
  IconPlus,
  IconList,
  IconUserStar,
  IconGuitarPick,
  IconBook,
  IconUsers,
  IconMessage,
  IconBusinessplan,
  IconSitemap,
} from '@tabler/icons-react'
import { AdminMenuItem } from '@/types/layout'

const root = 'center'

export const CenterMenuItems: AdminMenuItem[] = [
  { icon: IconDashboard, label: 'Dashboard', href: `/${root}/dashboard` },
  { type: 'divider', label: 'Songs Management' },
  {
    icon: IconMusic,
    label: 'Songs',
    href: `/${root}/songs`,
    subItems: [
      {
        icon: IconPlus,
        label: 'Add Song',
        href: `/${root}/songs/manage-songs/add-song`,
      },
      {
        icon: IconList,
        label: 'Manage Songs',
        href: `/${root}/songs/manage-songs`,
      },
    ],
  },
  {
    icon: IconUserStar,
    label: 'Artists',
    href: `/${root}/songs/artists`,
    subItems: [
      {
        icon: IconPlus,
        label: 'Add Artist',
        href: `/${root}/songs/manage-artists/add-artist`,
      },
      {
        icon: IconList,
        label: 'Manage Artists',
        href: `/${root}/songs/manage-artists`,
      },
    ],
  },
  {
    icon: IconGuitarPick,
    label: 'Guitar Chords',
    href: `/${root}/songs/guitar-chords`,
  },
  { type: 'divider', label: 'Pages' },
  {
    icon: IconBusinessplan,
    label: 'Pricing',
    href: `/${root}/pricing`,
    subItems: [
      {
        icon: IconPlus,
        label: 'Datatable',
        href: `/${root}/songs/manage-songs/add-song`,
      },
      {
        icon: IconList,
        label: 'Sales metrics',
        href: `/${root}/songs/manage-songs`,
      },
      {
        icon: IconList,
        label: 'Sales reports',
        href: `/${root}/songs/manage-songs`,
      },
      {
        icon: IconList,
        label: 'Visualizations',
        href: `/${root}/songs/manage-songs`,
      },

      {
        icon: IconList,
        label: 'Customer data',
        href: `/${root}/songs/manage-songs`,
      },
    ],
  },
  {
    icon: IconSitemap,
    label: 'More Pages',
    href: `/${root}/pricing`,
    subItems: [
      {
        icon: IconPlus,
        label: 'Datatable',
        href: `/${root}/songs/manage-songs/add-song`,
      },
      {
        icon: IconList,
        label: 'Sales metrics',
        href: `/${root}/songs/manage-songs`,
      },
      {
        icon: IconList,
        label: 'Sales reports',
        href: `/${root}/songs/manage-songs`,
      },
      {
        icon: IconList,
        label: 'Visualizations',
        href: `/${root}/songs/manage-songs`,
      },

      {
        icon: IconList,
        label: 'Customer data',
        href: `/${root}/songs/manage-songs`,
      },
    ],
  },
  { type: 'divider', label: 'Managment' },
  {
    icon: IconUsers,
    label: 'Users',
    href: `/${root}/users`,
  },
  {
    icon: IconMessage,
    label: 'Messages',
    href: `/${root}/messages`,
  },
  { type: 'divider', label: 'Sriptures' },
  {
    icon: IconBook,
    label: 'Bible',
    href: `/${root}/bible`,
  },
  {
    icon: IconBook,
    label: 'Versions',
    href: `/${root}/bible`,
  },
]
