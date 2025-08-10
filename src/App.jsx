import { Routes, Route, Navigate } from 'react-router-dom'
import Container from './components/Container.jsx'

import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import LoginShopper from './pages/LoginShopper.jsx'
import LoginBusiness from './pages/LoginBusiness.jsx'
import Signup from './pages/Signup.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Shopper from './pages/Shopper.jsx'
import Business from './pages/Business.jsx'

export default function App() {
  return (
    <Container>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* login générique (par défaut va vers /shopper) */}
        <Route path="/login" element={<Login />} />
        {/* routes dédiées */}
        <Route path="/login/shopper" element={<LoginShopper />} />
        <Route path="/login/business" element={<LoginBusiness />} />

        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/shopper" element={<Shopper />} />
        <Route path="/business" element={<Business />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Container>
  )
}
