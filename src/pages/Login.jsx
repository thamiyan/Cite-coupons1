import { useState } from 'react'
import { login } from '../lib/auth'
import Nav from '../components/Nav.jsx'

export default function Login() {
  const [email, setEmail] = useState('demo@cite.coupons')
  const [password, setPassword] = useState('demo')
  const [err, setErr] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    setErr('')
    try {
      await login({ email, password })
      const url = new URL(location.href)
      const next = url.searchParams.get('next') || '/shopper'
      location.href = next
    } catch (e) {
      setErr(e?.message || 'Login failed')
    }
  }

  return (
    <div>
      <Nav user={null} />
      <div className="max-w-md mx-auto mt-16 bg-white p-6 rounded-2xl shadow">
        <h1 className="text-2xl font-bold mb-4">Welcome back</h1>
        <form className="space-y-3" onSubmit={onSubmit}>
          <input className="w-full border p-2 rounded" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
          <input className="w-full border p-2 rounded" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
          {err && <div className="text-red-600 text-sm">{err}</div>}
          <button className="w-full bg-indigo-600 text-white py-2 rounded-2xl">Login</button>
        </form>
        <p className="mt-3 text-xs text-gray-500">Demo login works with any values.</p>
      </div>
    </div>
  )
}
