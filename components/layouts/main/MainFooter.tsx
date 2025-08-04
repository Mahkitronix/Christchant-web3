import MainLogo from '@/components/_sharable/logos/MainLogo'
import Style from '@/styles/main/layout/footer.module.css'
import MainContainer from './MainContainer'
import router from 'next/router'
import Link from 'next/link'

const footerLinks = [
  {
    text: 'Terms and Conditions',
    link: '/terms-and-conditions',
  },
  {
    text: 'Privacy Policy',
    link: '/privacy-policy',
  },
  {
    text: 'About Us',
    link: '/about-us',
  },
]

const footerAuthLinks = [
  {
    text: 'Sign In',
    link: '/auth/sign-in',
  },
  {
    text: 'Sign Up',
    link: '/auth/sign-up',
  },
]

export default function MainFooter() {
  return (
    <>
      <footer className={Style.footer}>
        <MainContainer>
          <div className="grid grid-cols-2">
            <div>
              <MainLogo
                onClick={() => router.push('/')}
                className="mb-3 cursor-pointer"
                isFull={true}
                width={116}
                height={28}
              />

              <ul>
                {footerLinks.map((item: any) => {
                  return (
                    <li key={item.link}>
                      <Link href={item.link}>{item.text}</Link>
                    </li>
                  )
                })}
              </ul>
            </div>
            <div>
              <h1 className="text-xl">Authentication</h1>
              <ul>
                {footerAuthLinks.map((item: any) => {
                  return (
                    <li key={item.link}>
                      <Link href={item.link}>{item.text}</Link>
                    </li>
                  )
                })}
              </ul>
            </div>
            <div className={Style.footerBottom}>All Rights Reserved @2024</div>
          </div>
        </MainContainer>
      </footer>
    </>
  )
}
