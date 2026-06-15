import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Menu from './components/Menu'
import InstagramGrid from './components/InstagramGrid'
import VisitUs from './components/VisitUs'
import Footer from './components/Footer'
import Login from './pages/Login'
import CustomerDashboard from './pages/CustomerDashboard'
import Admin from './pages/Admin'

export default function App() {
  const [route, setRoute] = useState(window.location.hash)

  useEffect(() => {
    const onHash = () => setRoute(window.location.hash)
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  if (route.startsWith('#/login')) return <Login />
  if (route.startsWith('#/account')) return <CustomerDashboard />
  if (route.startsWith('#/admin')) return <Admin />

  // الصفحة التعريفية العامة
  return (
    <div className="min-h-screen bg-cream-100">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Menu />
        <InstagramGrid />
        <VisitUs />
      </main>
      <Footer />
    </div>
  )
}
