// src/components/Navbar.jsx
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const NAV_LINKS = ['Home', 'Services', 'Portfolio', 'Testimonials', 'Blog', 'Contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-zinc-950/95 backdrop-blur-md shadow-lg shadow-black/40 border-b border-red-900/20' : 'bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <button onClick={() => scrollTo('home')} className="flex items-center gap-3">
          <div className="relative w-8 h-8 flex items-center justify-center text-red-600 hover:text-red-500 transition-colors">
            <svg className="w-8 h-8 drop-shadow-[0_0_8px_rgba(220,38,38,0.5)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
              <rect x="9" y="9" width="6" height="6" />
              <line x1="9" y1="1" x2="9" y2="4" />
              <line x1="15" y1="1" x2="15" y2="4" />
              <line x1="9" y1="20" x2="9" y2="23" />
              <line x1="15" y1="20" x2="15" y2="23" />
              <line x1="20" y1="9" x2="23" y2="9" />
              <line x1="20" y1="14" x2="23" y2="14" />
              <line x1="1" y1="9" x2="4" y2="9" />
              <line x1="1" y1="14" x2="4" y2="14" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-[9px] tracking-tighter pt-[1px]">JS</div>
          </div>
          <span className="text-white font-bold text-lg tracking-tight">JS <span className="text-red-500">Systems</span></span>
        </button>

        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(link => (
            <button key={link} onClick={() => scrollTo(link)}
              className="text-zinc-400 hover:text-red-400 text-sm font-medium tracking-widest uppercase transition-colors duration-200">
              {link}
            </button>
          ))}
          <button onClick={() => scrollTo('contact')}
            className="ml-2 px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-sm font-bold rounded-sm transition-all duration-200 hover:shadow-lg hover:shadow-red-900/40 active:scale-95">
            Get a Quote
          </button>
        </div>

        <button className="md:hidden text-zinc-300 hover:text-white" onClick={() => setMenuOpen(!menuOpen)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-zinc-950/98 border-t border-zinc-800 px-6 py-4 flex flex-col gap-4">
          {NAV_LINKS.map(link => (
            <button key={link} onClick={() => scrollTo(link)}
              className="text-zinc-300 hover:text-red-400 text-sm font-medium text-left tracking-widest uppercase">
              {link}
            </button>
          ))}
        </div>
      )}
    </nav>
  )
}
