import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/CreateAccount.css'

const CreateAccount = () => {
  
  const [error, setError] = useState();
  const [user, setUser] = useState({
    email: '',
    password:''
  });
    const navigate = useNavigate()
    const {signin} = useAuth();

    const handleChange = ({target:{name, value}}) => {
    setUser({...user, [name]:value})
    // console.log(e.target.name, e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await signin(user.email, user.password)
      navigate("/user");
    } catch (error) {
      setError('Server Error')      
    }
  }
  return (
    <div className="auth">
      <div className='auth__container'>
        {error && <p>{error}</p>}
        {/* <div className='auth__container'> */}
          <h2>Inicia sesion y descubre todos nuestros productos</h2>
        {/* </div> */}
        <form className="form" onSubmit={handleSubmit}>
          <div className='signin'>Continuar con Google</div>
          <div className='signin'>Continuar con facebook</div>
          <div>
            <label>Correo electronico</label><br/>
            <input 
            className='email input'
            placeholder='Ingresa tu correo' 
            type='email'
            name="email"
            onChange={handleChange}
            />
          </div>
          <div>
            <label>Contraseña</label><br/>
            <input 
            className='password input'
            placeholder='Ingrasa tu contraseña' 
            type='password'
            name="password"
            onChange={handleChange}
            />
          </div>
          <button className='button'>Registrate</button>
        </form>
          <Link to="/">Olvidaste tu contraseña?</Link>
      </div>
    </div>
  )
}

export default CreateAccount
