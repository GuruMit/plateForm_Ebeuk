import React, { useState } from 'react'
import { useAuth } from '../contexts/authContext'
import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'

const Login = () => {
 
    const [user , setUser] = useState('')
    const auth = useAuth()
    const navigate = useNavigate();

    const handlelogin = () => {
       auth.Login(user)
       navigate('/')
    }
    
  return (
    <div>
        <label >
        Username:{''}
        <input type="text" onChange={(e) => setUser(e.target.value)} />
        </label>
        <Button onClick={handlelogin}>Login</Button>
    </div>
  )
}

export default Login