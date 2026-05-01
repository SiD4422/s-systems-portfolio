// src/utils/api.js
// Centralised API helper. All fetch calls go through here.
// Backend URL is picked from VITE_API_URL env var (set in Vercel/Railway).
// In dev, Vite proxies /api → localhost:5000 automatically.

const BASE = import.meta.env.VITE_API_URL || '';

async function request(path, options = {}) {
  const token = localStorage.getItem('js_admin_token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const res = await fetch(`${BASE}${path}`, { ...options, headers });
  const data = await res.json();

  if (!res.ok) throw new Error(data.error || 'Request failed');
  return data;
}

// ── Public ────────────────────────────────────────────────────
export const submitOrder    = (body) => request('/api/orders', { method: 'POST', body: JSON.stringify(body) });
export const submitFeedback = (body) => request('/api/feedback', { method: 'POST', body: JSON.stringify(body) });
export const getApprovedFeedback = () => request('/api/feedback/approved');

// ── Admin ─────────────────────────────────────────────────────
export const adminLogin     = (body)           => request('/api/auth/login', { method: 'POST', body: JSON.stringify(body) });
export const getOrders      = (params = '')    => request(`/api/orders${params}`);
export const updateStatus   = (id, status)     => request(`/api/orders/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) });
export const deleteOrder    = (id)             => request(`/api/orders/${id}`, { method: 'DELETE' });
export const getAllFeedback  = ()               => request('/api/feedback');
export const approveFeedback = (id, approved)  => request(`/api/feedback/${id}/approve`, { method: 'PATCH', body: JSON.stringify({ approved }) });
export const deleteFeedback = (id)             => request(`/api/feedback/${id}`, { method: 'DELETE' });
