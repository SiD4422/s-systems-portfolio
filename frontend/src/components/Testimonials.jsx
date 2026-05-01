// src/components/Testimonials.jsx
// Loads approved testimonials from the backend (GET /api/feedback/approved)
import { useState, useEffect } from 'react'
import { getApprovedFeedback } from '../utils/api'

function StarRating({ rating }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(n => (
        <svg key={n} className={`w-4 h-4 ${n <= rating ? 'text-red-500' : 'text-zinc-700'}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export default function Testimonials() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getApprovedFeedback()
      .then(d => setItems(d.feedback))
      .catch(() => setItems([]))
      .finally(() => setLoading(false))
  }, [])

  // Don't render section if no approved testimonials yet
  if (!loading && items.length === 0) return null

  return (
    <section id="testimonials" className="bg-zinc-900 py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-red-500 text-xs font-bold uppercase tracking-[0.3em] mb-3">Client Reviews</p>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">What Students Say</h2>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-6 h-6 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map(item => (
              <div key={item.id} className="bg-zinc-800/50 border border-zinc-700/50 rounded-lg p-6 hover:border-red-800/40 transition-all duration-300">
                <StarRating rating={item.rating} />
                <p className="text-zinc-300 text-sm leading-relaxed mt-4 mb-5 italic">"{item.message}"</p>
                <div className="border-t border-zinc-700 pt-4">
                  <p className="text-white font-semibold text-sm">{item.name}</p>
                  <p className="text-red-400 text-xs mt-0.5">{item.project}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
