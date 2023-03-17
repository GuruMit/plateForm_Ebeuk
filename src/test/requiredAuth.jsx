import React from 'react'
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/authContext'

const RequiredAuth = ({children}) => {

    const auth = useAuth();

    if(!auth.user){
        return <Navigate to='/login' />
    }

  return children
}

export default RequiredAuth