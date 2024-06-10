import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Login } from './components/Login.jsx'
import { Signup  } from './components/Signup.jsx'
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar.jsx'
import Login_page from './pages/Login.jsx'

export default function App() {
  return (

    <Login_page/>
  );



  return (
    <BrowserRouter>
      <Routes>
        <Route path="" >
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="signup" element={<Signup />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
 

 