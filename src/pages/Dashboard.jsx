import Protected from '../components/Protected.jsx'
import Nav from '../components/Nav.jsx'

const DEMO = import.meta.env.VITE_DEMO_MODE === 'true'

export default function Dashboard() {
  return (
    <Protected>
      {(user) => (
        <div>
          <Nav user={user} />
          <div className="grid gap-6 md:grid-cols-3">
            <Card title="Status abonnement">
              {DEMO ? (
                <p>🔓 <b>Demo mode:</b> accès aux coupons simulé.</p>
              ) : (
                <p>🔒 Bloqué jusqu'à intégration Stripe (à venir)</p>
              )}
            </Card>
            <Card title="POS">
              {DEMO ? (
                <p>🧪 POS simulé (OAuth2 désactivé en démo)</p>
              ) : (
                <a className="text-blue-600 underline" href="#">Connecter mon POS (OAuth2 bientôt)</a>
              )}
            </Card>
            <Card title="Créer un coupon">
              <button className="px-3 py-2 rounded bg-green-600 text-white">Nouveau coupon</button>
            </Card>
          </div>
          {DEMO && (
            <div className="mt-6 bg-white rounded-2xl shadow p-5">
              <h3 className="font-semibold mb-2">Coupons (démo)</h3>
              <ul className="text-sm list-disc pl-6">
                <li>10% sur « Burger Classique » — expire 2025-12-31</li>
                <li>5$ de rabais sur « Poutine Large » — 1 utilisation</li>
              </ul>
            </div>
          )}
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

// =============================
// NOTES
// =============================
// 1) Local run: npm install && npm run dev
// 2) Demo Mode: controlled by VITE_DEMO_MODE=true (no backend needed)
// 3) Deploy on Vercel: import repo, set env VITE_DEMO_MODE=true, build `npm run build`, output `dist`
// 4) To go real later: set VITE_DEMO_MODE=false and fill Appwrite env vars, then replace demo shims with real DB calls.
