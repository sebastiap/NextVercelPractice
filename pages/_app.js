import MainLayout from '../src/components/Layout/main-layout'
import '../styles/globals.css'

// in Next, this function is the one that allows us to add a superior layer to the app.
export default function App({ Component, pageProps }) {
  return (
  <MainLayout>
    <Component {...pageProps} />
  </MainLayout>
  )
}
