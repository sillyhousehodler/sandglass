import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from '../components/Navbar';

import WalletContextProvider from '../contexts/WalletContextProvider';
import TransitionContextProvider from '../contexts/TransitionContextProvider';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Helius</title>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🔨</text></svg>" />
      </Head>
      {/* <Head>
        <title>Keepsake - Send encrypted messages on Solana</title>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🔨</text></svg>" />
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"/>
        <link href="https://fonts.googleapis.com/css2?family=Overlock:wght@400;700&family=Roboto:wght@400;700&display=swap" rel="stylesheet"/>
        <style jsx global>{`
          body {
            font-family: 'Roboto', sans-serif;
            font-size: 24px;
          }
        `}</style>
      </Head> */}
      <WalletContextProvider>
        <Navbar />
        <ToastContainer />
        <TransitionContextProvider>
          <Component {...pageProps} />
        </TransitionContextProvider>
      </WalletContextProvider>
    </>
  );
}

export default MyApp
