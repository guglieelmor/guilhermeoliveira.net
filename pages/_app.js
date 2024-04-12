import 'nextra-theme-blog/style.css'
import Head from 'next/head'
import { Analytics } from '@vercel/analytics/react';

import '../styles/main.css'
import { GoogleTagManager } from '@next/third-parties/google';

export default function Nextra({ Component, pageProps }) {
  return (
    <>
      <GoogleTagManager gtmId="G-JTP5KZ6L2C" />
      <Component {...pageProps} />
      <Analytics />
    </>
  )
}
