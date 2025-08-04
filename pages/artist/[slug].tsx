import MainContainer from '@/components/layouts/main/MainContainer'
import MainLayout from '@/components/layouts/main/MainLayout'
import UiHeroA from '@/components/_sharable/heroes/UiHeroA'

export default function ViewArtistPage() {
  return (
    <MainLayout pageTitle="View Artist">
      <UiHeroA />
      <MainContainer className="pb-[200px] pt-[100px]">
        View Song Details
        <h1 className="mt-12 text-xl">Artist Songs</h1>
      </MainContainer>
    </MainLayout>
  )
}
