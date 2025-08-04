import MainContainer from '@/components/layouts/main/MainContainer'
import MainLayout from '@/components/layouts/main/MainLayout'
import UiHeroA from '@/components/_sharable/heroes/UiHeroA'

export default function IndexPage() {
  return (
    <MainLayout pageTitle={`Welcome to ${process.env.APP_NAME}`}>
      <UiHeroA />
      <MainContainer className="pb-[200px] pt-[100px]">
        View Song Details
      </MainContainer>
    </MainLayout>
  )
}
