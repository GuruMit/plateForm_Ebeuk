import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavBar from "../components/Nav/navbar";
import Annonce from "../pages/annonce";
import Inscription from "../pages/inscription";
import Connexion from "../pages/connexion";
import PrivateRoute from "./privateRoutes";
import { AuthContextProvider } from "../contexts/authContext";
//
import Login from "../test/login";
import Profile from "../pages/accueille_fournisseur";
import RequiredAuth from "../test/requiredAuth";
import Passwordreset from "../pages/Passwordreset";
import Layout from "./Layout";
import RequireAuth from "../contexts/requireAuth";

 
const AppRouter = () => {
  return (
    <AuthContextProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* Publique */}
            <Route path="/" exact element={<Annonce />} />
            <Route path="/connexion" element={<Connexion />} />
            <Route path="/inscription" element={<Inscription />} />
            <Route path="/passwordreset" element={<Passwordreset />} />
            {/* Privé ou Proteger */}
            <Route/>
            <Route path="/profile" element={<Profile />} />
            {/* catch all */}
            {/* <Route path="/connexion" element={<Missing />} /> */}
          </Route>
        </Routes>
      </Router>
    </AuthContextProvider>
  );
};

export default AppRouter;
