import './index.css'
import Navbar from './components/Navbar.jsx'
import Login from './components/Login.jsx'
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home.jsx'
import Signup from './components/Signup.jsx'
import Booking from './components/Booking.jsx'
import Account from './components/Account.jsx'
import RentResults from './components/RentResults.jsx'
import Rent from './components/Rent.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import BookingResults from './components/BookingResults.jsx'
function App() {
  return (
    <>
      <Navbar />
      <ScrollToTop />
      <Routes>      
        <Route path='/' element={<Home />}/>
        <Route path='/account' element={<Account />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/signup' element={<Signup />}/>
        <Route path='/booking' element={<Booking />}/>
        <Route path='/vehicles/details' element={<Booking />}/>
        <Route path='/rentresults' element={<RentResults />}/>
        <Route path='/bookingresults' element={<BookingResults />}/>
        <Route path='/rent' element={<Rent />}/>
      </Routes>
    </>
  )
}

export default App
