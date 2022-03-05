import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/AuthButton.css'
const AuthButton = () => {
  return (
    <div className="authButton">
        <Link to='/signin' className="Navbar__button resgistration ">Registrate</Link>
        <Link to='/login' className="Navbar__button inicioSesion">Iniciar sesion</Link>   
    </div>
  )
}

export default AuthButton
