// src/pages/Home.jsx
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Services from '../components/Services'
import Portfolio from '../components/Portfolio'
import Testimonials from '../components/Testimonials'
import Blog from '../components/Blog'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import WhatsAppButton from '../components/WhatsAppButton'

export default function Home() {
  return (
    <div className="min-h-screen antialiased">
      <Navbar />
      <Hero />
      <Services />
      <Portfolio />
      <Testimonials />
      <Blog />
      <Contact />
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
