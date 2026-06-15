import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Features from './components/Features'
import Menu from './components/Menu'
import Reviews from './components/Reviews'
import BusyHours from './components/BusyHours'
import LocationHours from './components/LocationHours'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Features />
        <Menu />
        <Reviews />
        <BusyHours />
        <LocationHours />
      </main>
      <Footer />
    </div>
  )
}
