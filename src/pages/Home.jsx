import { Link } from 'react-router-dom'
import Nav from '../components/Nav.jsx'
import { useEffect, useState } from 'react'
import { getCurrentUser } from '../lib/auth'

export default function Home() {
  const [user, setUser] = useState(null)
  useEffect(() => { getCurrentUser().then(setUser).catch(() => {}) }, [])

  return (
    <div className="relative">
      <Nav user={user} />

      {/* soft gradient blobs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-indigo-200 blur-3xl opacity-40" />
        <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-emerald-200 blur-3xl opacity-40" />
      </div>

      {/* HERO */}
      <header className="mt-14 md:mt-20 text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-emerald-700 text-xs font-medium">
          🧪 Demo Mode activé — aucune carte requise
        </span>

        <h1 className="mt-6 text-4xl md:text-5xl font-black tracking-tight">
          Coupons locaux, <span className="text-indigo-600">simples</span> et <span className="text-emerald-600">mesurables</span>
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-gray-600">
          Accédez à des offres exclusives côté clients et suivez l’impact côté commerçants —
          tout cela en <b>mode démo</b>, prêt à montrer.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link to="/shopper" className="px-5 py-3 rounded-2xl bg-indigo-600 text-white shadow hover:shadow-md transition">
            Espace Shopper
          </Link>
          <Link to="/business" className="px-5 py-3 rounded-2xl bg-emerald-600 text-white shadow hover:shadow-md transition">
            Portail Business
          </Link>
          <Link to="/signup" className="px-5 py-3 rounded-2xl bg-white shadow hover:shadow-md transition border">
            Créer un compte
          </Link>
          <Link to="/login" className="px-5 py-3 rounded-2xl bg-gray-100 hover:bg-gray-200 transition">
            Se connecter
          </Link>
        </div>

        <div className="mt-6 text-xs text-gray-500">
          Pas de backend requis en démo · SPA Vite + React · Tailwind
        </div>
      </header>

      {/* FEATURES */}
      <section className="mt-14 grid gap-4 md:grid-cols-3">
        <Feature icon="🎟️" title="Coupons prêts à l’emploi" desc="Créez/activez vos coupons en quelques clics. Visible côté Shopper instantanément." />
        <Feature icon="📈" title="Analytics en direct (démo)" desc="Suivez redemptions & revenus attribués. Les stats se mettent à jour lors d’un rachat." />
        <Feature icon="⚙️" title="Pensé POS" desc="Intégration POS prévue. En démo, tout se fait côté navigateur (localStorage)." />
      </section>

      {/* HOW IT WORKS */}
      <section className="mt-14 bg-white rounded-2xl shadow p-6">
        <h2 className="text-xl font-semibold">Comment ça marche</h2>
        <ol className="mt-4 grid gap-4 md:grid-cols-3 text-sm">
          <Step n="1" title="Choisissez votre espace" text="Shopper pour voir les offres · Business pour créer/mesurer." />
          <Step n="2" title="Créez / Rachetez" text="Business: Nouveau coupon · Shopper: Redeem (demo) pour tester." />
          <Step n="3" title="Mesurez l’impact" text="Les redemptions & revenus s’additionnent sur le tableau de bord Business." />
        </ol>
      </section>

      <footer className="mt-12 mb-8 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Cite.Coupons — Demo
      </footer>
    </div>
  )
}

function Feature({ icon, title, desc }) {
  return (
    <div className="bg-white rounded-2xl shadow p-5">
      <div className="text-2xl">{icon}</div>
      <h3 className="mt-2 font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-gray-600">{desc}</p>
    </div>
  )
}

function Step({ n, title, text }) {
  return (
    <li className="rounded-xl border bg-gray-50 p-4">
      <div className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-indigo-600 text-white text-xs font-bold">{n}</div>
      <div className="mt-2 font-medium">{title}</div>
      <div className="text-gray-600 mt-1">{text}</div>
    </li>
  )
}
