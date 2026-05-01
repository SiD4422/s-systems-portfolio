// src/pages/Login.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { adminLogin } from '../utils/api'

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { loginSuccess } = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const data = await adminLogin(form)
      loginSuccess(data.token, data.admin)
      navigate('/admin')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 relative mb-4">
            <div className="absolute inset-0 bg-red-600 rounded-sm rotate-3" />
            <span className="relative text-white font-black text-lg">JS</span>
          </div>
          <h1 className="text-2xl font-black text-white">Admin Login</h1>
          <p className="text-zinc-500 text-sm mt-1">JS Systems Dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-zinc-900 border border-zinc-800 rounded-lg p-8 space-y-5">
          <div>
            <label className="block text-zinc-400 text-xs uppercase tracking-wider mb-2">Email</label>
            <input type="email" required autoFocus
              className="w-full bg-zinc-800 border border-zinc-700 focus:border-red-600 focus:ring-1 focus:ring-red-600/40 text-white placeholder-zinc-500 rounded-sm px-4 py-3 text-sm outline-none transition-all"
              value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
          </div>
          <div>
            <label className="block text-zinc-400 text-xs uppercase tracking-wider mb-2">Password</label>
            <input type="password" required
              className="w-full bg-zinc-800 border border-zinc-700 focus:border-red-600 focus:ring-1 focus:ring-red-600/40 text-white placeholder-zinc-500 rounded-sm px-4 py-3 text-sm outline-none transition-all"
              value={form.password} onChange={e => setForm({...form, password: e.target.value})} />
          </div>

          {error && (
            <div className="text-red-400 text-sm bg-red-950/40 border border-red-900/40 rounded-sm px-3 py-2">{error}</div>
          )}

          <button type="submit" disabled={loading}
            className="w-full py-3 bg-red-600 hover:bg-red-500 disabled:opacity-60 text-white font-bold rounded-sm transition-all active:scale-95 flex items-center justify-center gap-2">
            {loading ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Signing in…</> : 'Sign In →'}
          </button>
        </form>
      </div>
    </div>
  )
}
