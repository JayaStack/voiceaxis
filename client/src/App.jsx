import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import PageLoader from './components/PageLoader/PageLoader'

// Lazy-loaded pages — each becomes a separate chunk for optimal loading
const Home     = lazy(() => import('./pages/Home/Home'))
const Features = lazy(() => import('./pages/Features/Features'))
const About    = lazy(() => import('./pages/About/About'))
const Pricing  = lazy(() => import('./pages/Pricing/Pricing'))
const Contact  = lazy(() => import('./pages/Contact/Contact'))

/** Scroll to top on every route change */
function ScrollReset() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

function AppLayout() {
  return (
    <>
      <ScrollReset />
      <Navbar />
      <main>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/"         element={<Home />} />
            <Route path="/features" element={<Features />} />
            <Route path="/about"    element={<About />} />
            <Route path="/pricing"  element={<Pricing />} />
            <Route path="/contact"  element={<Contact />} />
            {/* Catch-all — redirect to home */}
            <Route path="*"         element={<Home />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  )
}
