import { Link } from 'react-router-dom'
import Nav from '../components/Nav.jsx'
import { useEffect, useState } from 'react'
import { getCurrentUser } from '../lib/auth'

export default function Home() {
  const [user, setUser] = useState(null)
  useEffect(() => { getCurrentUser().then(setUser).catch(() => {}) }, [])

  return (
    <div className="relative">
      {/* Home = info only → pas d’auth UI, pas de liens Shopper/Business dans la nav */}
      <Nav user={user} showAuth={false} showSections={false} />

      {/* décor doux */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-indigo-200 blur-3xl opacity-40" />
        <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-emerald-200 blur-3xl opacity-40" />
      </div>

      {/* HERO */}
      <header className="mt-14 md:mt-20 text-center">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight">
          La plateforme de <span className="text-indigo-600">coupons locaux</span> —
          <span className="text-emerald-600"> pour les shoppers et les commerçants</span>
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-gray-600">
          Côté <b>Shopper</b> : découvrez des offres près de vous. Côté <b>Business</b> : créez des coupons et suivez les résultats (démo).
        </p>

        {/* CTAs d’info uniquement (ancres internes) */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a href="#shoppers" className="px-5 py-3 rounded-2xl bg-indigo-600 text-white shadow hover:shadow-md transition">
            Découvrir pour Shoppers
          </a>
          <a href="#business" className="px-5 py-3 rounded-2xl bg-emerald-600 text-white shadow hover:shadow-md transition">
            Découvrir pour Commerçants
          </a>
        </div>

        {/* Liens d’auth (pas d’accès direct aux dashboards) */}
        <div className="mt-3 text-sm text-gray-600 flex flex-wrap items-center justify-center gap-4">
          <Link to="/login/shopper" className="underline">Se connecter (Shopper)</Link>
          <Link to="/login/business" className="underline">Se connecter (Business)</Link>
          <Link to="/signup" className="underline">Créer un compte</Link>
        </div>
      </header>

      {/* INTRO SECTIONS */}
      <section id="shoppers" className="mt-14 grid gap-5 md:grid-cols-2">
        <IntroCard
          title="Pour les Shoppers"
          points={[
            "Parcourez des coupons vérifiés près de chez vous",
            "Rachetez en un clic (démo) et suivez vos économies",
            "Interface simple, mobile-friendly",
          ]}
          ctas={[
            { to: "/login/shopper", label: "Se connecter (Shopper)", variant: "primary" },
            { to: "/signup", label: "Créer un compte", variant: "ghost" },
          ]}
        />
        <IntroCard
          id="business"
          title="Pour les Commerçants"
          points={[
            "Créez/activez vos coupons en quelques secondes",
            "Tableau de bord avec redemptions & revenus (démo)",
            "Pensé POS — intégrations à venir",
          ]}
          ctas={[
            { to: "/login/business", label: "Se connecter (Business)", variant: "primary-emerald" },
            { to: "/signup", label: "Créer un compte", variant: "ghost" },
          ]}
        />
      </section>

      {/* COMMENT ÇA MARCHE */}
      <section className="mt-14 bg-white rounded-2xl shadow p-6">
        <h2 className="text-xl font-semibold text-center">Comment ça marche</h2>
        <ol className="mt-4 grid gap-4 md:grid-cols-3 text-sm">
          <Step n="1" title="Choisissez votre espace" text="Shopper pour racheter des offres, Business pour en créer." />
          <Step n="2" title="Créez / Rachetez" text="Business: « Nouveau coupon » · Shopper: « Redeem (demo) » pour tester." />
          <Step n="3" title="Mesurez l’impact" text="Les redemptions et le revenu attribué se cumulent automatiquement." />
        </ol>
      </section>

      {/* TARIFS (sans montants) */}
      <section className="mt-14">
        <h2 className="text-center text-2xl font-semibold">Tarifs (aperçu)</h2>
        <p className="text-center text-gray-600 mt-1 text-sm">
          Les niveaux tarifaires arriveront bientôt — contactez-nous pour l’accès anticipé.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <PriceCard
            title="Démo"
            note="Sans paiement — pour tester"
            features={['Accès aux coupons démo', 'Rachat (demo) illimité', 'Aucune carte requise']}
            cta="Se connecter (Shopper)"
            to="/login/shopper"
          />
          <PriceCard
            title="Pro"
            note="Tarif à venir"
            highlight
            features={['Création illimitée', 'Analytics de base', 'Support email']}
            cta="Se connecter (Business)"
            to="/login/business"
          />
          <PriceCard
            title="Business"
            note="Tarif à venir"
            features={['Analytics avancés', 'Multiples utilisateurs', 'Intégration POS (à venir)']}
            cta="Nous contacter"
            to="/login/business"
          />
        </div>
      </section>

      <footer className="mt-12 mb-8 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Cite.Coupons — Informations & Démo
      </footer>
    </div>
  )
}

function IntroCard({ title, points, ctas }) {
  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h3 className="text-lg font-semibold">{title}</h3>
      <ul className="mt-3 text-sm text-gray-700 list-disc pl-5 space-y-1">
        {points.map((p, i) => <li key={i}>{p}</li>)}
      </ul>
      <div className="mt-4 flex flex-wrap gap-2">
        {ctas.map((c, i) => (
          <Link
            key={i}
            to={c.to}
            className={
              c.variant === 'primary'
                ? 'px-4 py-2 rounded-2xl bg-indigo-600 text-white'
                : c.variant === 'primary-emerald'
                ? 'px-4 py-2 rounded-2xl bg-emerald-600 text-white'
                : 'px-4 py-2 rounded-2xl bg-gray-100'
            }
          >
            {c.label}
          </Link>
        ))}
      </div>
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

function PriceCard({ title, note, features, cta, to, highlight }) {
  return (
    <div className={`rounded-2xl p-5 bg-white shadow ${highlight ? 'ring-2 ring-emerald-500' : ''}`}>
      <div className="flex items-baseline justify-between">
        <h3 className="font-semibold">{title}</h3>
        {note && <div className="text-xs text-gray-500">{note}</div>}
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
