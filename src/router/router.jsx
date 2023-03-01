import React from 'react'
import { BrowserRouter as Router, Routes, Route  } from "react-router-dom";


import NavBar from '../components/Nav/navbar';
import Annonce from '../pages/annonce';
import Inscription  from '../pages/inscription';
import Connexion from '../pages/connexion';


const AppRouter = () => {
  return (
    <Router>
      <NavBar/>
    <Routes>

      <Route path="/annonce" exact element={<Annonce/>} />
      <Route path="/inscription" element={<Inscription/>} />
      <Route path="/connexion" element={<Connexion/>} />

    </Routes>
  </Router>
  )
}

export default AppRouter
