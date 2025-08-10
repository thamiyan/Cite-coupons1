import { Link } from 'react-router-dom'
import { logout } from '../lib/auth'

export default function Nav({ user }) {
  return (
    <nav className="flex items-center justify-between py-4">
      <Link to="/" className="font-semibold">Cite.Coupons</Link>
      <div className="flex gap-3 items-center">
        {user ? (
          <>
            <span className="text-sm">{user.name || user.email}</span>
            <button
              onClick={async () => { await logout(); location.href = '/login' }}
              className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
            >Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="px-3 py-1 rounded bg-gray-200">Login</Link>
            <Link to="/signup" className="px-3 py-1 rounded bg-blue-600 text-white">Sign up</Link>
          </>
        )}
      </div>
    </nav>
  )
}
