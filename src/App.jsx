import { useEffect, useState } from 'react'
import './App.css'
import {db} from "./firebase";
console.log("Firestore instance:", db);
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Todopage from './pages/Todopage';
import Login from "./pages/Login";
import Navbar from './components/Navbar';
import Register from "./pages/Register";
import { ToastContainer } from 'react-toastify';

function App() {


 

  return (
   <Router>
   
   <Navbar/>
    <Routes>
        <Route path='/' element={<Todopage/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        
    </Routes>
    <ToastContainer/>
   </Router>
        
  )
}

export default App
