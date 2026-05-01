// src/components/Hero.jsx
export default function Hero() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="home" className="relative min-h-screen bg-zinc-950 flex items-center justify-center overflow-hidden">
      {/* Circuit grid background */}
      <div className="absolute inset-0 circuit-bg opacity-[0.07]" />
      {/* Red glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-red-900/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-red-800/60 bg-red-950/40 text-red-400 text-xs font-medium tracking-widest uppercase mb-8">
          <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
          College Startup · Custom Engineering Projects
        </div>

        {/* Logo — replace with <img src="/logo.png" className="h-28 w-auto mx-auto mb-10" /> */}
        <div className="flex justify-center mb-10">
          <div className="w-28 h-28 rounded-xl border-2 border-red-700/50 bg-zinc-900/80 flex flex-col items-center justify-center shadow-2xl shadow-red-950/50">
            <div className="text-red-500 font-black text-3xl leading-none">JS</div>
            <div className="text-zinc-400 text-[10px] tracking-[0.25em] uppercase font-semibold mt-1">Systems</div>
          </div>
        </div>

        <h1 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tight mb-6">
          From Concept to Circuit:{' '}
          <span className="text-gradient">Custom Engineering</span>{' '}
          Projects for Students
        </h1>

        <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          We design, build, and deliver complete technical projects — software, IoT, embedded systems, and hardware.
          You focus on learning. We handle the engineering.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button onClick={() => scrollTo('contact')}
            className="px-8 py-4 bg-red-600 hover:bg-red-500 text-white font-bold text-base rounded-sm transition-all duration-200 hover:shadow-2xl hover:shadow-red-900/60 active:scale-95 tracking-wide">
            Request a Project →
          </button>
          <button onClick={() => scrollTo('portfolio')}
            className="px-8 py-4 border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white font-semibold text-base rounded-sm transition-all duration-200 active:scale-95">
            View Our Work
          </button>
        </div>

        <div className="mt-16 flex flex-wrap justify-center gap-8 md:gap-16">
          {[['30+', 'Projects Delivered'], ['100%', 'On-Time Rate'], ['5+', 'Domains Covered']].map(([n, l]) => (
            <div key={l} className="text-center">
              <div className="text-3xl font-black text-red-500">{n}</div>
              <div className="text-zinc-500 text-xs uppercase tracking-widest mt-1">{l}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-zinc-600 animate-bounce">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  )
}
