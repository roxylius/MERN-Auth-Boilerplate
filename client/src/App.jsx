import './App.css'
import { Routes, Route } from 'react-router-dom'
import Signup from './components/signup/index'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Signup />} />
      {/* <Route path="/another" element={<AnotherComponent />} /> Example additional route */}
    </Routes>
  )
}

export default App
