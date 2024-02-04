import { Html, Head, Main, NextScript } from 'next/document'
import { Analytics } from '@vercel/analytics/react';
import { GoogleAnalytics } from '@next/third-parties/google'

export default function Document() {
  const meta = {
    title: 'Guilherme Oliveira - Portfolio',
    description: 'Olá! Eu sou Guilherme Oliveira, um desenvolvedor web.',
    image: 'https://assets.vercel.com/image/upload/q_auto/front/vercel/dps.png'
  }

  return (
    <Html lang="en">
      <Head>
        <meta name="robots" content="follow, index" />
        <meta name="description" content={meta.description} />
        <meta property="og:site_name" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.image} />
      </Head>
      <body>
        <Main />
        <NextScript />
        <Analytics />
      </body>
      <GoogleAnalytics gaId="G-JTP5KZ6L2C" />
    </Html>
  )
}
