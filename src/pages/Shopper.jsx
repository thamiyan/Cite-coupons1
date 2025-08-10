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
    const { next, saved } = redeemCoupon(id)
    setCoupons(next.filter(c => c.active))
    setStats(addRedemption(saved))
    alert(`Redeemed! You saved $${saved.toFixed(2)} (demo).`)
  }

  return (
    <Protected>
      {(user) => (
        <div>
          <Nav user={user} />

          <header className="mt-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-2xl font-bold">Coupons (Shopper)</h1>
              <p className="text-sm text-gray-600">Utilisez les offres actives et suivez vos économies.</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Stat label="Redemptions" value={stats.redemptions} />
              <Stat label="Économies" value={`$${stats.savings.toFixed(2)}`} />
            </div>
          </header>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {coupons.map((c) => (
              <div key={c.id} className="bg-white rounded-2xl shadow p-5 flex items-start justify-between">
                <div>
                  <div className="text-sm text-gray-500">{c.code}</div>
                  <div className="text-lg font-semibold">{c.title}</div>
                  <div className="text-sm text-gray-500">{c.endDate ? `Expire ${c.endDate}` : 'Sans date de fin'}</div>
                </div>
                <button
                  onClick={() => onRedeem(c.id)}
                  className="px-3 py-1.5 rounded-2xl bg-emerald-600 text-white text-sm hover:opacity-90"
                >
                  Redeem (demo)
                </button>
              </div>
            ))}
            {coupons.length === 0 && (
              <div className="bg-white rounded-2xl shadow p-5 text-gray-500">
                Aucun coupon actif pour le moment.
              </div>
            )}
          </div>
        </div>
      )}
    </Protected>
  )
}

function Stat({ label, value }) {
  return (
    <div className="rounded-2xl border bg-white p-4">
      <div className="text-xs text-gray-500">{label}</div>
      <div className="text-xl font-semibold">{value}</div>
    </div>
  )
}
