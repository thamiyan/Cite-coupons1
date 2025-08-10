import { useEffect, useState } from 'react'
import Protected from '../components/Protected.jsx'
import Nav from '../components/Nav.jsx'
import { loadCoupons, seedIfEmpty, redeemCoupon } from '../lib/demoStore'
import { getStats, addRedemption } from '../lib/stats'

export default function Shopper() {
  const [coupons, setCoupons] = useState([])
  const [stats, setStats] = useState(getStats())

  useEffect(() => {
    const cur = loadCoupons()
    setCoupons((cur.length ? cur : seedIfEmpty()).filter(c => c.active))
  }, [])

  function onRedeem(id) {
    const { next, saved } = redeemCoupon(id) // updates store
    setCoupons(next.filter(c => c.active))
    setStats(addRedemption(saved))          // update shopper stats
    alert(`Redeemed! You saved $${saved.toFixed(2)} (demo).`)
  }

  return (
    <Protected>
      {(user) => (
        <div>
          <Nav user={user} />
          <h1 className="text-2xl font-bold mb-4">Coupons (Shopper)</h1>

          <div className="grid gap-6 md:grid-cols-3">
            <Card title="Status abonnement">
              <p>🔓 <b>Demo mode:</b> accès aux coupons simulé.</p>
            </Card>
            <Card title="Mes stats">
              <div className="text-sm">
                <div><b>Redemptions:</b> {stats.redemptions}</div>
                <div><b>Économies totales:</b> ${stats.savings.toFixed(2)}</div>
              </div>
            </Card>
            <Card title="Actions rapides">
              <a href="/login" className="px-3 py-2 rounded bg-blue-600 text-white inline-block">Se connecter</a>
            </Card>
          </div>

          <div className="mt-6 bg-white rounded-2xl shadow p-5">
            <h3 className="font-semibold mb-3">Coupons disponibles</h3>
            <ul className="text-sm space-y-2">
              {coupons.map(c => (
                <li key={c.id} className="flex items-center justify-between border-t pt-2">
                  <div>
                    <b>{c.title}</b> — code <code className="bg-gray-100 px-1 rounded">{c.code}</code>
                    {c.endDate ? ` — expire ${c.endDate}` : ''}
                  </div>
                  <button onClick={() => onRedeem(c.id)} className="px-2 py-1 text-xs rounded bg-emerald-600 text-white">
                    Redeem (demo)
                  </button>
                </li>
              ))}
              {coupons.length === 0 && <li className="text-gray-500">Aucun coupon actif pour le moment.</li>}
            </ul>
          </div>
        </div>
      )}
    </Protected>
  )
}

function Card({ title, children }) {
  return (
    <div className="bg-white rounded-2xl shadow p-5">
      <h2 className="font-semibold mb-2">{title}</h2>
      <div className="text-sm text-gray-700">{children}</div>
    </div>
  )
}
