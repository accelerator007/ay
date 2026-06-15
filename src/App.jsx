import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Menu from './components/Menu'
import InstagramGrid from './components/InstagramGrid'
import VisitUs from './components/VisitUs'
import Footer from './components/Footer'
import OrderModal from './components/OrderModal'
import Cashier from './pages/Cashier'

export default function App() {
  const [route, setRoute] = useState(window.location.hash)
  const [orderOpen, setOrderOpen] = useState(false)

  useEffect(() => {
    const onHash = () => setRoute(window.location.hash)
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  // صفحة الكاشير (للموظفين): #/cashier
  if (route.startsWith('#/cashier')) return <Cashier />

  return (
    <div className="min-h-screen bg-ink-900">
      <Navbar onOrder={() => setOrderOpen(true)} />
      <main>
        <Hero onOrder={() => setOrderOpen(true)} />
        <About />
        <Menu onOrder={() => setOrderOpen(true)} />
        <InstagramGrid />
        <VisitUs />
      </main>
      <Footer />

      {/* زر طلب عائم */}
      <button
        onClick={() => setOrderOpen(true)}
        className="btn-metal fixed bottom-5 left-1/2 z-40 -translate-x-1/2 shadow-2xl shadow-ink-950 sm:bottom-6"
      >
        🛒 اطلب الآن
      </button>

      <OrderModal open={orderOpen} onClose={() => setOrderOpen(false)} />
    </div>
  )
}
