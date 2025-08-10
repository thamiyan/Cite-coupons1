import { useEffect, useMemo, useState } from 'react'
import Protected from '../components/Protected.jsx'
import Nav from '../components/Nav.jsx'
import { seedIfEmpty, addCoupon, updateCoupon, removeCoupon, loadCoupons, getAggregates } from '../lib/demoStore'

export default function Business() {
  const [coupons, setCoupons] = useState([])
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState(null)

  useEffect(() => { setCoupons(seedIfEmpty()) }, [])
  const agg = useMemo(() => getAggregates(), [coupons])

  const metrics = [
    { label: 'Redemptions (total)', value: agg.totalRedemptions },
    { label: 'Revenue attribué', value: `$${agg.totalRevenue.toFixed(2)}` },
    { label: 'Coupons actifs', value: agg.active },
    { label: 'Nouveaux clients', value: 18 }, // demo
  ]

  function onCreate() { setEditing(null); setOpen(true) }
  function onEdit(c)  { setEditing(c); setOpen(true) }
  function onDelete(id) { setCoupons(removeCoupon(id)) }
  function onToggle(id) {
    const current = loadCoupons().find(c => c.id === id)
    setCoupons(updateCoupon(id, { active: !current.active }))
  }
  function onSave(form) {
    const clean = {
      title: form.title.trim(),
      type: form.type,
      value: Number(form.value || 0),
      code:  form.code.trim(),
      endDate: form.endDate || '',
      active: !!form.active,
    }
    setCoupons(editing ? updateCoupon(editing.id, clean) : addCoupon(clean))
    setOpen(false); setEditing(null)
  }

  const top = [...coupons].sort((a,b) => (b.redemptions || 0) - (a.redemptions || 0)).slice(0,3)

  return (
    <Protected>
      {(user) => (
        <div>
          <Nav user={user} />

          <header className="mt-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-2xl font-bold">Business Analytics (demo)</h1>
              <p className="text-sm text-gray-600">Créez et gérez vos coupons. Les stats se mettent à jour avec les redemptions.</p>
            </div>
            <button onClick={onCreate} className="px-4 py-2 rounded-2xl bg-green-600 text-white hover:opacity-90">
              Nouveau coupon
            </button>
          </header>

          <div className="mt-6 grid gap-4 md:grid-cols-4">
            {metrics.map(m => (
              <div key={m.label} className="bg-white rounded-2xl shadow p-4">
                <div className="text-xs text-gray-500">{m.label}</div>
                <div className="text-2xl font-semibold mt-1">{m.value}</div>
              </div>
            ))}
          </div>

          <section className="mt-6 bg-white rounded-2xl shadow p-5 overflow-x-auto">
            <h2 className="font-semibold mb-3">Top coupons</h2>
            <table className="w-full text-sm">
              <thead className="text-left text-gray-500">
                <tr>
                  <th className="py-2 pr-4">Coupon</th>
                  <th className="py-2 pr-4">Redemptions</th>
                  <th className="py-2 pr-4">Revenue</th>
                  <th className="py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {top.map(t => (
                  <tr key={t.id} className="border-t">
                    <td className="py-2 pr-4">{t.title}</td>
                    <td className="py-2 pr-4">{t.redemptions || 0}</td>
                    <td className="py-2 pr-4">${(t.revenue || 0).toFixed(2)}</td>
                    <td className="py-2">
                      <span className={`px-2 py-0.5 rounded text-xs ${t.active ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-200 text-gray-700'}`}>
                        {t.active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                  </tr>
                ))}
                {top.length === 0 && <tr><td colSpan={4} className="py-4 text-gray-500">No coupons yet.</td></tr>}
              </tbody>
            </table>
          </section>

          <section className="mt-6 bg-white rounded-2xl shadow p-5 overflow-x-auto">
            <h2 className="font-semibold mb-3">Tous les coupons</h2>
            <table className="w-full text-sm">
              <thead className="text-left text-gray-500">
                <tr>
                  <th className="py-2 pr-4">Title</th>
                  <th className="py-2 pr-4">Type / Value</th>
                  <th className="py-2 pr-4">Code</th>
                  <th className="py-2 pr-4">End date</th>
                  <th className="py-2 pr-4">Redemptions</th>
                  <th className="py-2 pr-4">Revenue</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {coupons.map(c => (
                  <tr key={c.id} className="border-t">
                    <td className="py-2 pr-4">{c.title}</td>
                    <td className="py-2 pr-4">
                      {c.type === 'percent' ? `${c.value}%`
                        : c.type === 'amount' ? `$${c.value}`
                        : 'BOGO'}
                    </td>
                    <td className="py-2 pr-4">{c.code}</td>
                    <td className="py-2 pr-4">{c.endDate || '—'}</td>
                    <td className="py-2 pr-4">{c.redemptions || 0}</td>
                    <td className="py-2 pr-4">${(c.revenue || 0).toFixed(2)}</td>
                    <td className="py-2">
                      <div className="flex gap-2">
                        <button onClick={() => onEdit(c)} className="px-2 py-1 text-xs rounded bg-blue-600 text-white">Edit</button>
                        <button onClick={() => onToggle(c.id)} className="px-2 py-1 text-xs rounded bg-amber-500 text-white">{c.active ? 'Deactivate' : 'Activate'}</button>
                        <button onClick={() => onDelete(c.id)} className="px-2 py-1 text-xs rounded bg-red-600 text-white">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
                {coupons.length === 0 && (<tr><td className="py-4 text-gray-500" colSpan={7}>No coupons yet.</td></tr>)}
              </tbody>
            </table>
          </section>

          {open && (
            <CouponModal
              initial={editing}
              onClose={() => { setOpen(false); setEditing(null) }}
              onSave={onSave}
            />
          )}
        </div>
      )}
    </Protected>
  )
}

function CouponModal({ initial, onClose, onSave }) {
  const [form, setForm] = useState({
    title: initial?.title || '',
    type: initial?.type || 'percent',
    value: initial?.value ?? 10,
    code: initial?.code || '',
    endDate: initial?.endDate || '',
    active: initial?.active ?? true,
  })
  function change(k, v) { setForm(prev => ({ ...prev, [k]: v })) }
  function submit(e) {
    e.preventDefault()
    if (!form.title || !form.code) return alert('Title and Code are required.')
    onSave(form)
  }
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow p-5 w-full max-w-md">
        <h3 className="font-semibold mb-3">{initial ? 'Edit coupon' : 'New coupon'}</h3>
        <form className="space-y-3" onSubmit={submit}>
          <input className="w-full border p-2 rounded" placeholder="Title" value={form.title} onChange={e=>change('title', e.target.value)} />
          <div className="flex gap-3">
            <select className="border p-2 rounded w-1/2" value={form.type} onChange={e=>change('type', e.target.value)}>
              <option value="percent">% off</option>
              <option value="amount">$ off</option>
              <option value="bogo">BOGO</option>
            </select>
            <input className="border p-2 rounded w-1/2" type="number" min="0" step="1" value={form.value} onChange={e=>change('value', e.target.value)} disabled={form.type==='bogo'} />
          </div>
          <input className="w-full border p-2 rounded" placeholder="Code (e.g., BURGER10)" value={form.code} onChange={e=>change('code', e.target.value)} />
          <input className="w-full border p-2 rounded" type="date" value={form.endDate} onChange={e=>change('endDate', e.target.value)} />
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={form.active} onChange={e=>change('active', e.target.checked)} />
            Active
          </label>

          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={onClose} className="px-3 py-2 rounded bg-gray-200">Cancel</button>
            <button type="submit" className="px-3 py-2 rounded bg-green-600 text-white">{initial ? 'Save' : 'Create'}</button>
          </div>
        </form>
      </div>
    </div>
  )
}
