import MainContainer from '@/components/layouts/main/MainContainer'
import MainLayout from '@/components/layouts/main/MainLayout'
import UiHeroA from '@/components/_sharable/heroes/UiHeroA'
import Link from 'next/link'

const links = [
  {
    label: 'Planetshakers',
    link: '/artist/planetshakers',
  },
  {
    label: 'Hillsong',
    link: '/artist/hillsong',
  },
  {
    label: 'Anel',
    link: '/artist/anel',
  },
]

export default function ArtistsPage() {
  return (
    <MainLayout pageTitle="Artists">
      <UiHeroA />
      <MainContainer className="pb-[200px] pt-[100px]">
        {links.map((item: any) => {
          return (
            <Link className="block" key={item.link} href={item.link}>
              {item.label}
            </Link>
          )
        })}
      </MainContainer>
    </MainLayout>
  )
}
