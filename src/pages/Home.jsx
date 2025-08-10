import { Link } from 'react-router-dom'
import Nav from '../components/Nav.jsx'
import { useEffect, useState } from 'react'
import { getCurrentUser } from '../lib/auth'

export default function Home() {
  const [user, setUser] = useState(null)
  useEffect(() => { getCurrentUser().then(setUser).catch(() => {}) }, [])

  return (
    <div className="relative">
      {/* showAuth={false} => pas de Logout/Signup/Login dans la nav sur Home */}
      <Nav user={user} showAuth={false} />

      {/* décor doux */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-indigo-200 blur-3xl opacity-40" />
        <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-emerald-200 blur-3xl opacity-40" />
      </div>

      {/* HERO */}
      <header className="mt-14 md:mt-20 text-center">
        <h1 className="mt-2 text-4xl md:text-5xl font-black tracking-tight">
          Coupons locaux, <span className="text-indigo-600">simples</span> et <span className="text-emerald-600">mesurables</span>
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-gray-600">
          Infos sur l’entreprise & démo : côté Shopper pour racheter, côté Business pour créer et analyser.
        </p>

        {/* CTA organisés */}
        <div className="mt-8 flex flex-col items-center gap-4">
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/shopper" className="px-5 py-3 rounded-2xl bg-indigo-600 text-white shadow hover:shadow-md transition">
              Espace Shopper
            </Link>
            <Link to="/business" className="px-5 py-3 rounded-2xl bg-emerald-600 text-white shadow hover:shadow-md transition">
              Portail Business
            </Link>
          </div>
          <div className="text-sm text-gray-600 flex flex-wrap justify-center gap-3">
            <Link to="/signup" className="underline">Créer un compte</Link>
            {/* deux routes de login dédiées */}
            <Link to="/login/shopper" className="underline">Se connecter (Shopper)</Link>
            <Link to="/login/business" className="underline">Se connecter (Business)</Link>
          </div>
        </div>
      </header>

      {/* TARIFS */}
      <section className="mt-16">
        <h2 className="text-center text-2xl font-semibold">Tarifs</h2>
        <p className="text-center text-gray-600 mt-1 text-sm">Des plans simples pour démarrer en toute sérénité.</p>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <PriceCard
            title="Gratuit"
            price="0$"
            cta="Essayer (Shopper)"
            to="/login/shopper"
            features={['Accès aux coupons démo', 'Rachat (demo) illimité', 'Aucune carte requise']}
          />
          <PriceCard
            title="Pro"
            price="29$/mois"
            highlight
            cta="Démarrer Business"
            to="/login/business"
            features={['Création de coupons illimitée', 'Analytics de base', 'Support email']}
          />
          <PriceCard
            title="Business"
            price="99$/mois"
            cta="Nous contacter"
            to="/business"
            features={['Analytics avancés', 'Équipe multi-utilisateurs', 'Intégration POS (à venir)']}
          />
        </div>
      </section>

      <footer className="mt-12 mb-8 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Cite.Coupons — Demo
      </footer>
    </div>
  )
}

function PriceCard({ title, price, features, cta, to, highlight }) {
  return (
    <div className={`rounded-2xl p-5 bg-white shadow ${highlight ? 'ring-2 ring-emerald-500' : ''}`}>
      <div className="flex items-baseline justify-between">
        <h3 className="font-semibold">{title}</h3>
        <div className="text-2xl font-bold">{price}</div>
      </div>
      <ul className="mt-3 text-sm text-gray-600 list-disc pl-5 space-y-1">
        {features.map((f, i) => <li key={i}>{f}</li>)}
      </ul>
      <Link to={to} className={`mt-4 inline-block px-4 py-2 rounded-2xl ${highlight ? 'bg-emerald-600' : 'bg-gray-900'} text-white`}>
        {cta}
      </Link>
    </div>
  )
}
