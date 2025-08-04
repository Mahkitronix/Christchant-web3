import { HeroUIProvider } from '@heroui/react'
import apolloClient from '@/lib/apollo-client'
import { ApolloProvider } from '@apollo/client'
import { GoogleOAuthProvider } from '@react-oauth/google'

// import {SessionProvider} from 'next-auth/react'
import { Toaster } from 'react-hot-toast'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from '@/store'
import '@/styles/globals.css'
import '@/styles/fonts.css'

// function MyApp({Component, pageProps: {session, ...pageProps}}: AppProps) {
function App({ Component, pageProps: { ...pageProps } }: AppProps) {
  console.log('(process.env.GOOGLE_CLIENT_ID', process.env.GOOGLE_CLIENT_ID)

  return (
    <GoogleOAuthProvider clientId={String(process.env.GOOGLE_CLIENT_ID)}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {/* <SessionProvider session={session}> */}
          <ApolloProvider client={apolloClient}>
            <HeroUIProvider>
              <Toaster
                position="top-center"
                reverseOrder={false}
                gutter={8}
                containerClassName=""
                containerStyle={{}}
                toastOptions={{
                  duration: 3000,
                  style: {
                    background: '#fff',
                    color: '#515151',
                  },
                }}
              />
              <div className="matter-font">
                <Component {...pageProps} />
              </div>
            </HeroUIProvider>
          </ApolloProvider>
          {/* </SessionProvider> */}
        </PersistGate>
      </Provider>
    </GoogleOAuthProvider>
  )
}

export default App
