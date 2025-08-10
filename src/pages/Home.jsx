import Nav from '../components/Nav.jsx'
import { useEffect, useState } from 'react'
import { getCurrentUser } from '../lib/auth'
import { Link } from 'react-router-dom' // ✅ Use Link so no full reload

export default function Home() {
  const [user, setUser] = useState(null)
  useEffect(() => { getCurrentUser().then(setUser).catch(() => {}) }, [])

  return (
    <div>
      <Nav user={user} />
      <header className="mt-16 text-center">
        <h1 className="text-4xl font-black">Cite.Coupons</h1>
        <p className="mt-3 text-gray-600">
          Accédez à des coupons exclusifs (abonnement requis — simulé en démo).
        </p>
        <div className="mt-6 flex gap-3 justify-center flex-wrap">
          <Link to="/shopper" className="px-4 py-2 rounded bg-blue-600 text-white">
            Espace Shopper
          </Link>
          <Link to="/business" className="px-4 py-2 rounded bg-emerald-600 text-white">
            Portail Business
          </Link>
          <Link to="/signup" className="px-4 py-2 rounded bg-indigo-600 text-white">
            Créer un compte
          </Link>
          <Link to="/login" className="px-4 py-2 rounded bg-gray-200">
            Se connecter
          </Link>
        </div>
      </header>
    </div>
