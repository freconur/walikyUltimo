import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginAccount.css'
const LoginAccount = () => {
    const [user, setUser] = useState({
        email: '',
        password:''
    });
    const navigate = useNavigate()
    const {login} = useAuth();
    const [error, setError] = useState();  
  
      const handleChange = ({target:{name, value}}) => {
      setUser({...user, [name]:value})
      // console.log(e.target.name, e.target.value)
    }
  
    const handleSubmit = async (e) => {
      e.preventDefault()
      // setError('')
      try {
        await login(user.email, user.password)
        navigate("/");
      } catch (error) {
        // if (error.code ===)
        setError('error de correo o contrasenia')
      }
    }
    return (
      <div className='auth'>
        <div className='auth__container'>
          {error && <p>{error}</p> }
          <h2>Inicia sesion y descubre todos nuestros productos</h2>
    
          <form className="form" onSubmit={handleSubmit}>
          <div className='signin'>Continuar con Google</div>
            <div className='signin'>Continuar con facebook</div>
            <div>
              <label>Correo electronico</label>
              <input 
              className='email input'
              placeholder='Ingresa tu correo' 
              type='email'
              name="email"
              onChange={handleChange}
              />
            </div>
            <div>
              <label>Contraseña</label>
              <input 
              className='password input'
              placeholder='Ingresa tu contraseña' 
              type='password'
              name="password"
              onChange={handleChange}
              />
            </div>
            <button className='button'>Login</button>
          </form>
        </div>
      </div>
    )
}

export default LoginAccount
