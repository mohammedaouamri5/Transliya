import "./index.css";
import Navbar from "./components/Navbar.jsx";
import Login from "./components/Login.jsx";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home.jsx";
import Signup from "./components/Signup.jsx";
import Booking from "./components/Booking.jsx";
import RentResults from "./components/RentResults.jsx";
import Rent from "./components/Rent.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import BookingResults from "./components/BookingResults.jsx";
import Dashboard from "./components/Dashboard.jsx";
import Plan from "./components/Plan.jsx";
import Footer from "./components/Footer.jsx";
function App() {
   
  return (
    <>

      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/vehicles/details" element={<Booking />} />
        <Route path="/rentresults/:ids" element={<RentResults />} />
        <Route path="/bookingresults/:ids" element={<BookingResults />} />
        <Route path="/rent" element={<Rent />} />
        <Route path="/plan" element={<Plan />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
