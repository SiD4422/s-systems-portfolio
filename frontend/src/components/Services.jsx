// src/components/Services.jsx
const SERVICES = [
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" /></svg>,
    title: 'Software & Web Development',
    desc: 'Full-stack web apps, automation scripts, dashboards, and APIs. From simple CRUD to ML-integrated backends.',
    tags: ['React', 'Python', 'Flask', 'FastAPI', 'Node.js', 'MongoDB'],
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z" /></svg>,
    title: 'Hardware & IoT Integration',
    desc: 'Smart sensor networks, wireless communication, real-time monitoring dashboards and cloud-connected devices.',
    tags: ['ESP32', 'Arduino', 'MQTT', 'Sensors', 'Raspberry Pi', 'ThingSpeak'],
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" /></svg>,
    title: 'Embedded Systems & RTOS',
    desc: 'Bare-metal firmware, FreeRTOS implementations, peripheral drivers, and power-optimized microcontroller projects.',
    tags: ['FreeRTOS', 'STM32', 'C/C++', 'UART/SPI/I2C', 'Keil uVision'],
  },
]

export default function Services() {
  return (
    <section id="services" className="bg-zinc-900 py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-red-500 text-xs font-bold uppercase tracking-[0.3em] mb-3">What We Build</p>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Our Services</h2>
          <p className="text-zinc-400 max-w-xl mx-auto">
            End-to-end project delivery across three core engineering domains.
            Full architecture, code, hardware, and documentation — submission-ready.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {SERVICES.map((s, i) => (
            <div key={i} className="group relative bg-zinc-800/50 border border-zinc-700/50 rounded-lg p-8 hover:border-red-700/60 hover:bg-zinc-800 transition-all duration-300 overflow-hidden">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-red-950/30 to-transparent pointer-events-none" />
              <div className="relative z-10">
                <div className="text-red-500 mb-5 group-hover:scale-110 transition-transform duration-200 inline-block">{s.icon}</div>
                <h3 className="text-white font-bold text-xl mb-3">{s.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-6">{s.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {s.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 bg-zinc-900 border border-zinc-700 text-zinc-300 text-xs rounded font-mono">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
