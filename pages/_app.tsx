import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { Nav } from '../components/layout/nav';
import { Footer } from '../components/layout/footer';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Nav />
      <main>
        <Component {...pageProps} />
      </main>
      <Footer />
    </>
  );
}

export default MyApp
