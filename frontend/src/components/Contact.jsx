// src/components/Contact.jsx
// Submits to POST /api/orders and POST /api/feedback
import { useState } from 'react'
import { submitOrder, submitFeedback } from '../utils/api'

const DOMAINS = ['Software / Web', 'Hardware / IoT', 'Embedded Systems', 'Both (Hardware + Software)']

const INPUT = 'w-full bg-zinc-800 border border-zinc-700 focus:border-red-600 focus:ring-1 focus:ring-red-600/40 text-white placeholder-zinc-500 rounded-sm px-4 py-3 text-sm outline-none transition-all duration-200'

function Alert({ type, msg }) {
  return (
    <div className={`flex items-center gap-3 px-4 py-3 rounded-sm text-sm border ${
      type === 'success'
        ? 'bg-green-950/50 border-green-800/50 text-green-400'
        : 'bg-red-950/50 border-red-800/50 text-red-400'
    }`}>
      <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        {type === 'success'
          ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />}
      </svg>
      {msg}
    </div>
  )
}

export default function Contact() {
  const [tab, setTab] = useState('order')

  const [order, setOrder] = useState({ name: '', email: '', phone: '', department: '', domain: '', description: '', deadline: '' })
  const [feedback, setFeedback] = useState({ name: '', project: '', rating: '5', message: '' })

  const [orderState, setOrderState] = useState({ loading: false, status: null, msg: '' })
  const [fbState, setFbState] = useState({ loading: false, status: null, msg: '' })

  async function handleOrder(e) {
    e.preventDefault()
    setOrderState({ loading: true, status: null, msg: '' })
    try {
      const data = await submitOrder(order)
      setOrderState({ loading: false, status: 'success', msg: data.message })
      setOrder({ name: '', email: '', phone: '', department: '', domain: '', description: '', deadline: '' })
    } catch (err) {
      setOrderState({ loading: false, status: 'error', msg: err.message })
    }
  }

  async function handleFeedback(e) {
    e.preventDefault()
    setFbState({ loading: true, status: null, msg: '' })
    try {
      const data = await submitFeedback(feedback)
      setFbState({ loading: false, status: 'success', msg: data.message })
      setFeedback({ name: '', project: '', rating: '5', message: '' })
    } catch (err) {
      setFbState({ loading: false, status: 'error', msg: err.message })
    }
  }

  return (
    <section id="contact" className="bg-zinc-900 py-24 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-red-500 text-xs font-bold uppercase tracking-[0.3em] mb-3">Work With Us</p>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Get In Touch</h2>
          <p className="text-zinc-400">Order a custom project or leave feedback on a past build.</p>
        </div>

        {/* Tab toggle */}
        <div className="flex mb-8 bg-zinc-800 rounded-sm p-1 border border-zinc-700">
          {[['order', 'Request a Project'], ['feedback', 'Submit Feedback']].map(([id, label]) => (
            <button key={id} onClick={() => setTab(id)}
              className={`flex-1 py-2.5 text-sm font-semibold rounded-sm transition-all duration-200 ${
                tab === id ? 'bg-red-600 text-white shadow-md' : 'text-zinc-400 hover:text-white'
              }`}>
              {label}
            </button>
          ))}
        </div>

        {/* ── ORDER FORM ── */}
        {tab === 'order' && (
          <form onSubmit={handleOrder} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-zinc-400 text-xs uppercase tracking-wider mb-2">Full Name *</label>
                <input type="text" className={INPUT} placeholder="Your name"
                  value={order.name} onChange={e => setOrder({...order, name: e.target.value})} required />
              </div>
              <div>
                <label className="block text-zinc-400 text-xs uppercase tracking-wider mb-2">Email *</label>
                <input type="email" className={INPUT} placeholder="you@college.edu"
                  value={order.email} onChange={e => setOrder({...order, email: e.target.value})} required />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-zinc-400 text-xs uppercase tracking-wider mb-2">Department *</label>
                <input type="text" className={INPUT} placeholder="e.g. ECE, CSE, Mech"
                  value={order.department} onChange={e => setOrder({...order, department: e.target.value})} required />
              </div>
              <div>
                <label className="block text-zinc-400 text-xs uppercase tracking-wider mb-2">Phone</label>
                <input type="tel" className={INPUT} placeholder="+91 XXXXX XXXXX"
                  value={order.phone} onChange={e => setOrder({...order, phone: e.target.value})} />
              </div>
            </div>
            <div>
              <label className="block text-zinc-400 text-xs uppercase tracking-wider mb-2">Project Domain *</label>
              <select className={INPUT} value={order.domain} onChange={e => setOrder({...order, domain: e.target.value})} required>
                <option value="">Select domain…</option>
                {DOMAINS.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-zinc-400 text-xs uppercase tracking-wider mb-2">Project Description *</label>
              <textarea className={`${INPUT} resize-none h-32`} placeholder="Describe your project idea, objectives, and any specific requirements…"
                value={order.description} onChange={e => setOrder({...order, description: e.target.value})} required />
            </div>
            <div>
              <label className="block text-zinc-400 text-xs uppercase tracking-wider mb-2">Submission Deadline *</label>
              <input type="date" className={INPUT} value={order.deadline} onChange={e => setOrder({...order, deadline: e.target.value})} required />
            </div>

            {orderState.status && <Alert type={orderState.status} msg={orderState.msg} />}

            <button type="submit" disabled={orderState.loading}
              className="w-full py-4 bg-red-600 hover:bg-red-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold rounded-sm transition-all duration-200 hover:shadow-xl hover:shadow-red-900/40 active:scale-95 tracking-wide flex items-center justify-center gap-2">
              {orderState.loading ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Submitting…</> : 'Submit Project Request →'}
            </button>
          </form>
        )}

        {/* ── FEEDBACK FORM ── */}
        {tab === 'feedback' && (
          <form onSubmit={handleFeedback} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-zinc-400 text-xs uppercase tracking-wider mb-2">Your Name *</label>
                <input type="text" className={INPUT} placeholder="Your name"
                  value={feedback.name} onChange={e => setFeedback({...feedback, name: e.target.value})} required />
              </div>
              <div>
                <label className="block text-zinc-400 text-xs uppercase tracking-wider mb-2">Project Name *</label>
                <input type="text" className={INPUT} placeholder="What did we build for you?"
                  value={feedback.project} onChange={e => setFeedback({...feedback, project: e.target.value})} required />
              </div>
            </div>
            <div>
              <label className="block text-zinc-400 text-xs uppercase tracking-wider mb-2">Rating: {feedback.rating} / 5</label>
              <div className="flex gap-2">
                {[1,2,3,4,5].map(n => (
                  <button type="button" key={n} onClick={() => setFeedback({...feedback, rating: String(n)})}
                    className={`w-10 h-10 rounded-sm border text-sm font-bold transition-all duration-150 ${
                      parseInt(feedback.rating) >= n ? 'bg-red-600 border-red-500 text-white' : 'bg-zinc-800 border-zinc-700 text-zinc-500 hover:border-zinc-500'
                    }`}>
                    {n}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-zinc-400 text-xs uppercase tracking-wider mb-2">Your Feedback *</label>
              <textarea className={`${INPUT} resize-none h-32`} placeholder="How was your experience working with JS Systems?"
                value={feedback.message} onChange={e => setFeedback({...feedback, message: e.target.value})} required />
            </div>

            {fbState.status && <Alert type={fbState.status} msg={fbState.msg} />}

            <button type="submit" disabled={fbState.loading}
              className="w-full py-4 bg-red-600 hover:bg-red-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold rounded-sm transition-all duration-200 hover:shadow-xl hover:shadow-red-900/40 active:scale-95 tracking-wide flex items-center justify-center gap-2">
              {fbState.loading ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Submitting…</> : 'Submit Feedback →'}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
