import 'nextra-theme-blog/style.css'
import Head from 'next/head'
import { Analytics } from '@vercel/analytics/react';

import '../styles/main.css'

export default function Nextra({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link
          rel="alternate"
          type="application/rss+xml"
          title="RSS"
          href="/feed.xml"
        />
        <link
          rel="preload"
          href="/fonts/Inter-roman.latin.var.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        dangerouslySetInnerHTML={{
          __html: `
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-JTP5KZ6L2C"></script>
          <script>
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          
            gtag('config', 'G-JTP5KZ6L2C');
          </script>
          `,
        }}
      </Head>
      <Component {...pageProps} />
      <Analytics />
    </>
  )
}
