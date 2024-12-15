import './App.css'
import { Routes, Route } from 'react-router-dom'
import Signup from './components/signup/index'
import Home from './components/home'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/home" element={<Home />} /> 
    </Routes>
  )
}

export default App
