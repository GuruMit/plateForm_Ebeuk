import React, { useContext } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

const PrivateRoute = ({ element: Element, ...props }) => {
   const {currentUser} = useAuth();
   const location = useLocation();
   
//    const {path} = props
  return (

    currentUser ? <Outlet/> : <Navigate to="/connexion" state={{from:location}} replace/>

    

  );
}

export default PrivateRoute;
