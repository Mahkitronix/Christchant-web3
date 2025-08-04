import MainContainer from '@/components/layouts/main/MainContainer'
import MainLayout from '@/components/layouts/main/MainLayout'
import UiHeroA from '@/components/_sharable/heroes/UiHeroA'
import Link from 'next/link'

const links = [
  {
    label: 'Goodness',
    link: '/song/goodness',
  },
  {
    label: 'Your Grace',
    link: '/song/your-grace',
  },
  {
    label: 'Nothing is Impossible',
    link: '/song/nothing-is-impossible',
  },
]

export default function SongsPage() {
  return (
    <MainLayout pageTitle={`Welcome to ${process.env.APP_NAME}`}>
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
