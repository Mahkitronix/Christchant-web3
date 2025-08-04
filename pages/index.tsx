import MainContainer from '@/components/layouts/main/MainContainer'
import MainLayout from '@/components/layouts/main/MainLayout'
import UiHeroA from '@/components/_sharable/heroes/UiHeroA'
import { useGoogleOneTapLogin } from '@react-oauth/google'
import AveryNiceTools from './sections/AveryNiceTools'
import UltimateLirbrary from './sections/UltimateLirbrary'
import DownloadApps from './sections/DownloadApps'
import WhatsInOurApp from './sections/WhatsInOurApp'
import MovingLogo from './sections/MovingLogo'
import Questions from './sections/Questions'
export default function IndexPage() {
  useGoogleOneTapLogin({
    onSuccess: (credentialResponse) => {
      console.log(credentialResponse)
    },
    onError: () => {
      console.log('Login Failed')
    },
  })

  return (
    <MainLayout pageTitle={`Welcome to ${process.env.APP_NAME}`}>
      <UiHeroA />
      <MainContainer className="">
        <AveryNiceTools />
        <UltimateLirbrary />
        <DownloadApps />
        <WhatsInOurApp />
        <MovingLogo />
        <Questions />
      </MainContainer>
    </MainLayout>
  )
}
