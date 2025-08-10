import { Link, useLocation } from 'react-router-dom'
import { logout } from '../lib/auth'

export default function Nav({ user }) {
  const { pathname } = useLocation()
  const isActive = (to) =>
    pathname === to ? 'bg-gray-900 text-white' : 'hover:bg-gray-100 text-gray-700'

  return (
    <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link to="/" className="font-black tracking-tight text-lg">
          Cite.<span className="text-indigo-600">Coupons</span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          <Link to="/shopper" className={`px-3 py-1.5 rounded-2xl text-sm ${isActive('/shopper')}`}>Shopper</Link>
          <Link to="/business" className={`px-3 py-1.5 rounded-2xl text-sm ${isActive('/business')}`}>Business</Link>
        </div>

        <div className="flex items-center gap-2">
          {user ? (
            <>
              <span className="hidden sm:block text-sm text-gray-600">{user.name || user.email}</span>
              <button
                onClick={async () => { await logout(); location.href = '/login' }}
                className="px-3 py-1.5 rounded-2xl text-sm bg-gray-900 text-white hover:opacity-90"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="px-3 py-1.5 rounded-2xl text-sm bg-gray-100">Login</Link>
              <Link to="/signup" className="px-3 py-1.5 rounded-2xl text-sm bg-indigo-600 text-white">Sign up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
