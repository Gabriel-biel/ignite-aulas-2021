import { AppProps } from 'next/app'
import { Header } from '../components/Header'

import { SessionProvider } from 'next-auth/react'

import '../styles/global.scss'

interface MyAppProps extends AppProps{
  pageProps: {
    session: {
      user: {
        name: string;
        id: string;
      },
      expires: any;
    }
  }
}

function MyApp({ Component, pageProps: { session, ...pageProps } }: MyAppProps) {
  return (
    <SessionProvider session={session}>
      <Header />
      <Component {...pageProps} />
    </SessionProvider>
  ) 
}

export default MyApp
