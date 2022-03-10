import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import app from '../firebase/firebase.config';
import { getFirestore, collection, query, getDocs, doc, setDoc } from 'firebase/firestore';
import '../styles/CreateAccount.css'

const db = getFirestore(app)

const CreateAccount = () => {
  const [activeForm, setActiveForm] = useState(false)
  const [error, setError] = useState();
  const [usuario, setUsuario] = useState({
    email: '',
    password:''
  });
  const [datosUsuario, setDatosUsuario] = useState({
    nombre: '',
    apellido: '',
    rol: 'usuario'
  })
    const navigate = useNavigate()
    const {signin, user} = useAuth();

    const handleChange = ({target:{name, value}}) => {
    setUsuario({...usuario, [name]:value})
    setDatosUsuario({...datosUsuario, [name]: value})
    // console.log(e.target.name, e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await signin(usuario.email, usuario.password)
      setActiveForm(!activeForm)
    } catch (error) {
      setError('Server Error')      
    }
  }
  
  const handleSubmitData = async(e) => {
    // navigate("/user");
    e.preventDefault()
    console.log("hola bebe, me handicho que estas haciendo maldades")
    const q = query(collection(db, "userName"));
          const querySnapshot = await getDocs(q);
          const queryData = querySnapshot.docs.map((data) => ({...data.data(), id: data.id,}));
          console.log(queryData);
          debugger
          queryData.map(async () => {
            await setDoc(doc(db, `userName/${user.uid}`), {

            })
          })
  }
  return (
    <div className="auth">
      <div className='auth__container'>
        {error && <p>{error}</p>}
          <h2>Inicia sesion y descubre todos nuestros productos</h2>

        { !activeForm && 
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
        } 

        {/* //form para la peticion de datos nombre, email, rol :usuario\ */}

        {activeForm && 
          <form className="form" onSubmit={handleSubmitData}>
            <div>
              <label>Nombre</label>
              <input 
              onChange={handleChange}
              type="text" 
              className='email input'
              />
            </div>
            <div>
              <label>Apellidos</label>
              <input type="text" 
              className='email input'
              onChange={handleChange}
              />
            </div>
            <div>
              <input 
              type="text"
              // value="usuario"
              />
            </div>
            <button>resgitrar</button>
          </form>
        }



          <Link to="/">Olvidaste tu contraseña?</Link>
      </div>
    </div>
  )
}

export default CreateAccount
