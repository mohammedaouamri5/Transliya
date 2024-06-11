import './index.css'
import Navbar from './components/Navbar.jsx'
import Login from './components/Login.jsx'
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home.jsx'

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/login' element={<Login />}/>

      </Routes>
    </>
  )
}

export default App
