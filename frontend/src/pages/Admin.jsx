// src/pages/Admin.jsx
// Full admin dashboard: view/manage orders, approve/delete feedback
import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import {
  getOrders, updateStatus, deleteOrder,
  getAllFeedback, approveFeedback, deleteFeedback
} from '../utils/api'

const STATUS_COLORS = {
  pending:     'bg-amber-900/40 text-amber-400 border-amber-800/40',
  'in-progress': 'bg-blue-900/40 text-blue-400 border-blue-800/40',
  completed:   'bg-green-900/40 text-green-400 border-green-800/40',
  cancelled:   'bg-zinc-800 text-zinc-500 border-zinc-700',
}

function Badge({ status }) {
  return (
    <span className={`px-2 py-0.5 rounded text-xs font-medium border ${STATUS_COLORS[status] || STATUS_COLORS.pending}`}>
      {status}
    </span>
  )
}

function Spinner() {
  return <div className="w-5 h-5 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
}

export default function Admin() {
  const { admin, logout } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('orders')

  // Orders state
  const [orders, setOrders] = useState([])
  const [ordersLoading, setOrdersLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState('')
  const [selectedOrder, setSelectedOrder] = useState(null)

  // Feedback state
  const [feedbacks, setFeedbacks] = useState([])
  const [fbLoading, setFbLoading] = useState(true)

  const loadOrders = useCallback(async () => {
    setOrdersLoading(true)
    try {
      const params = statusFilter ? `?status=${statusFilter}` : ''
      const data = await getOrders(params)
      setOrders(data.orders)
    } catch (e) { console.error(e) }
    setOrdersLoading(false)
  }, [statusFilter])

  const loadFeedback = useCallback(async () => {
    setFbLoading(true)
    try {
      const data = await getAllFeedback()
      setFeedbacks(data.feedback)
    } catch (e) { console.error(e) }
    setFbLoading(false)
  }, [])

  useEffect(() => { loadOrders() }, [loadOrders])
  useEffect(() => { if (activeTab === 'feedback') loadFeedback() }, [activeTab, loadFeedback])

  function handleLogout() {
    logout()
    navigate('/admin/login')
  }

  async function handleStatusChange(id, status) {
    try {
      await updateStatus(id, status)
      setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o))
      if (selectedOrder?.id === id) setSelectedOrder(prev => ({ ...prev, status }))
    } catch (e) { alert(e.message) }
  }

  async function handleDeleteOrder(id) {
    if (!confirm('Delete this order?')) return
    try {
      await deleteOrder(id)
      setOrders(prev => prev.filter(o => o.id !== id))
      if (selectedOrder?.id === id) setSelectedOrder(null)
    } catch (e) { alert(e.message) }
  }

  async function handleToggleApprove(id, approved) {
    try {
      await approveFeedback(id, approved)
      setFeedbacks(prev => prev.map(f => f.id === id ? { ...f, approved: approved ? 1 : 0 } : f))
    } catch (e) { alert(e.message) }
  }

  async function handleDeleteFeedback(id) {
    if (!confirm('Delete this feedback?')) return
    try {
      await deleteFeedback(id)
      setFeedbacks(prev => prev.filter(f => f.id !== id))
    } catch (e) { alert(e.message) }
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Top bar */}
      <header className="border-b border-zinc-800 bg-zinc-950/95 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-7 h-7">
              <div className="absolute inset-0 bg-red-600 rounded-sm rotate-3" />
              <div className="absolute inset-0 flex items-center justify-center text-white font-black text-xs">JS</div>
            </div>
            <span className="font-bold text-base">Admin Dashboard</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-zinc-500 text-sm hidden sm:block">{admin?.email}</span>
            <button onClick={handleLogout}
              className="px-3 py-1.5 border border-zinc-700 hover:border-red-700 text-zinc-400 hover:text-red-400 text-sm rounded-sm transition-all">
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Tab nav */}
        <div className="flex gap-2 mb-8">
          {[['orders', 'Project Orders'], ['feedback', 'Client Feedback']].map(([id, label]) => (
            <button key={id} onClick={() => setActiveTab(id)}
              className={`px-5 py-2 rounded-sm text-sm font-semibold transition-all ${
                activeTab === id ? 'bg-red-600 text-white' : 'bg-zinc-900 border border-zinc-700 text-zinc-400 hover:text-white'
              }`}>
              {label}
            </button>
          ))}
        </div>

        {/* ── ORDERS ── */}
        {activeTab === 'orders' && (
          <div className="flex gap-6 flex-col lg:flex-row">
            {/* List */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-white font-bold text-lg flex-1">Orders</h2>
                <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
                  className="bg-zinc-800 border border-zinc-700 text-zinc-300 text-sm rounded-sm px-3 py-1.5 outline-none">
                  <option value="">All statuses</option>
                  {['pending','in-progress','completed','cancelled'].map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <button onClick={loadOrders} className="text-zinc-500 hover:text-zinc-300 transition-colors" title="Refresh">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                </button>
              </div>

              {ordersLoading ? (
                <div className="flex justify-center py-16"><Spinner /></div>
              ) : orders.length === 0 ? (
                <div className="text-center py-16 text-zinc-600">No orders found.</div>
              ) : (
                <div className="space-y-3">
                  {orders.map(order => (
                    <div key={order.id}
                      onClick={() => setSelectedOrder(order)}
                      className={`bg-zinc-900 border rounded-lg p-4 cursor-pointer transition-all hover:border-zinc-600 ${selectedOrder?.id === order.id ? 'border-red-700' : 'border-zinc-800'}`}>
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-white font-semibold text-sm">{order.name}</span>
                            <Badge status={order.status} />
                          </div>
                          <p className="text-zinc-500 text-xs mt-1">{order.department} · {order.domain}</p>
                          <p className="text-zinc-600 text-xs mt-0.5">Deadline: {order.deadline}</p>
                        </div>
                        <span className="text-zinc-600 text-xs shrink-0">{new Date(order.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Detail panel */}
            {selectedOrder && (
              <div className="lg:w-96 shrink-0">
                <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 sticky top-24">
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="font-bold text-white">Order #{selectedOrder.id}</h3>
                    <button onClick={() => setSelectedOrder(null)} className="text-zinc-600 hover:text-zinc-300">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </div>

                  <div className="space-y-3 text-sm mb-5">
                    {[
                      ['Name', selectedOrder.name],
                      ['Email', selectedOrder.email],
                      ['Phone', selectedOrder.phone || '—'],
                      ['Department', selectedOrder.department],
                      ['Domain', selectedOrder.domain],
                      ['Deadline', selectedOrder.deadline],
                      ['Submitted', new Date(selectedOrder.created_at).toLocaleString()],
                    ].map(([k, v]) => (
                      <div key={k} className="flex gap-3">
                        <span className="text-zinc-500 w-24 shrink-0">{k}</span>
                        <span className="text-zinc-200 break-all">{v}</span>
                      </div>
                    ))}
                  </div>

                  <div className="bg-zinc-800 rounded p-3 mb-5">
                    <p className="text-zinc-500 text-xs mb-1 uppercase tracking-wider">Description</p>
                    <p className="text-zinc-300 text-sm leading-relaxed">{selectedOrder.description}</p>
                  </div>

                  <div className="mb-4">
                    <label className="text-zinc-500 text-xs uppercase tracking-wider block mb-2">Update Status</label>
                    <select
                      value={selectedOrder.status}
                      onChange={e => handleStatusChange(selectedOrder.id, e.target.value)}
                      className="w-full bg-zinc-800 border border-zinc-700 text-white text-sm rounded-sm px-3 py-2 outline-none">
                      {['pending','in-progress','completed','cancelled'].map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>

                  <button onClick={() => handleDeleteOrder(selectedOrder.id)}
                    className="w-full py-2 border border-red-900/60 hover:border-red-700 text-red-500 hover:text-red-400 text-sm rounded-sm transition-all">
                    Delete Order
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── FEEDBACK ── */}
        {activeTab === 'feedback' && (
          <div>
            <h2 className="text-white font-bold text-lg mb-4">Client Feedback</h2>
            {fbLoading ? (
              <div className="flex justify-center py-16"><Spinner /></div>
            ) : feedbacks.length === 0 ? (
              <div className="text-center py-16 text-zinc-600">No feedback yet.</div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {feedbacks.map(fb => (
                  <div key={fb.id} className={`bg-zinc-900 border rounded-lg p-5 transition-all ${fb.approved ? 'border-green-900/50' : 'border-zinc-800'}`}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex gap-0.5">
                        {[1,2,3,4,5].map(n => (
                          <svg key={n} className={`w-3.5 h-3.5 ${n <= fb.rating ? 'text-red-500' : 'text-zinc-700'}`} fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded border ${fb.approved ? 'bg-green-900/40 text-green-400 border-green-800/40' : 'bg-zinc-800 text-zinc-500 border-zinc-700'}`}>
                        {fb.approved ? 'Published' : 'Hidden'}
                      </span>
                    </div>
                    <p className="text-zinc-300 text-sm leading-relaxed mb-3 italic">"{fb.message}"</p>
                    <p className="text-white text-sm font-semibold">{fb.name}</p>
                    <p className="text-red-400 text-xs">{fb.project}</p>
                    <p className="text-zinc-600 text-xs mt-1">{new Date(fb.created_at).toLocaleDateString()}</p>
                    <div className="flex gap-2 mt-4">
                      <button onClick={() => handleToggleApprove(fb.id, !fb.approved)}
                        className={`flex-1 py-1.5 text-xs font-semibold rounded-sm border transition-all ${
                          fb.approved
                            ? 'border-zinc-700 text-zinc-400 hover:border-red-800 hover:text-red-400'
                            : 'border-green-800/60 text-green-400 hover:bg-green-900/20'
                        }`}>
                        {fb.approved ? 'Unpublish' : 'Approve & Publish'}
                      </button>
                      <button onClick={() => handleDeleteFeedback(fb.id)}
                        className="px-3 py-1.5 text-xs border border-zinc-700 text-zinc-500 hover:border-red-900 hover:text-red-500 rounded-sm transition-all">
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
