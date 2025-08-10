import { Routes, Route, Navigate } from 'react-router-dom'
import Container from './components/Container.jsx'

import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Dashboard from './pages/Dashboard.jsx'   // keep if you still want it
import Shopper from './pages/Shopper.jsx'
import Business from './pages/Business.jsx'

export default function App() {
  return (
    <Container>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/shopper" element={<Shopper />} />
        <Route path="/business" element={<Business />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Container>
  )
}
