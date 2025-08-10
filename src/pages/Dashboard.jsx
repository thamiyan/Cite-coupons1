import Protected from '../components/Protected.jsx'
import Nav from '../components/Nav.jsx'

const DEMO = import.meta.env.VITE_DEMO_MODE === 'true'

export default function Dashboard() {
  return (
    <Protected>
      {(user) => (
        <div>
          <Nav user={user} />
          <header className="mt-6">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-sm text-gray-600">Aperçu rapide de votre compte.</p>
          </header>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <Card title="Status abonnement">
              {DEMO ? <p>🔓 <b>Demo mode:</b> accès aux coupons simulé.</p> : <p>🔒 Bloqué jusqu'à intégration Stripe</p>}
            </Card>
            <Card title="POS">
              {DEMO ? <p>🧪 POS simulé (OAuth2 désactivé en démo)</p> : <a className="text-blue-600 underline" href="#">Connecter mon POS</a>}
            </Card>
            <Card title="Accès rapide">
              <div className="flex gap-2">
                <a href="/shopper" className="px-3 py-1.5 rounded-2xl bg-indigo-600 text-white text-sm">Espace Shopper</a>
                <a href="/business" className="px-3 py-1.5 rounded-2xl bg-emerald-600 text-white text-sm">Portail Business</a>
              </div>
            </Card>
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
