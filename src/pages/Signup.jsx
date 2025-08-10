import { useState } from 'react'
import { signup } from '../lib/auth'

export default function Signup() {
  const [name, setName] = useState('Demo User')
  const [email, setEmail] = useState('demo@cite.coupons')
  const [password, setPassword] = useState('demo')
  const [err, setErr] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    setErr('')
    try {
      await signup({ name, email, password })
      location.href = '/dashboard'
    } catch (e) {
      setErr(e?.message || 'Signup failed')
    }
  }

  return (
    <div className="max-w-md mx-auto mt-16 bg-white p-6 rounded-2xl shadow">
      <h1 className="text-2xl font-bold mb-4">Create account</h1>
      <form className="space-y-3" onSubmit={onSubmit}>
        <input className="w-full border p-2 rounded" placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
        <input className="w-full border p-2 rounded" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="w-full border p-2 rounded" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        {err && <div className="text-red-600 text-sm">{err}</div>}
        <button className="w-full bg-blue-600 text-white py-2 rounded">Sign up</button>
      </form>
    </div>
  )
}
