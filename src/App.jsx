import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Menu from './components/Menu'
import InstagramGrid from './components/InstagramGrid'
import VisitUs from './components/VisitUs'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-ink-900">
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
