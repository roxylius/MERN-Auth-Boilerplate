import './App.css'
import { Routes, Route } from 'react-router-dom'
import Signup from './components/signup'
import Home from './components/home'
import ForgotPassword from './components/forgotPassword'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/home" element={<Home />} /> 
      <Route path="/forgot-password" element={<ForgotPassword />} /> 
    </Routes>
  )
}

export default App
