import React, { useState } from 'react'
import app from '../firebase/firebase.config';
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom';
import { getFirestore, collection, addDoc } from 'firebase/firestore'
import { getStorage, ref, uploadBytes, getDownloadURL} from 'firebase/storage';
import '../styles/UserDashboard.css'

const db = getFirestore(app);
const storage = getStorage();

const UserDashBoard = () => {
  const collectionProduct = collection(db, "productos");
  const [newProductName, setNewProductName] = useState("");
  const [newProductPrice, setNewProductPrice] = useState(0);
  const [productUrl, setProductUrl] = React.useState("");

   
    //logica para agregar datos a la base de datos
    const fileHandler = async (e) => {
        //detectar archivos
        const archivoLocal = e.target.files[0];
        //cargarlo a firebase storage
        const filesRef = ref(storage, `tazas/${archivoLocal.name}`);
        await uploadBytes(filesRef, archivoLocal);
        //obtener url de descarga
        const url = await getDownloadURL(filesRef);
        console.log(url)
        setProductUrl(url);
      };
    const addProduct = async () => {

        await addDoc(
            collectionProduct, 
            {name: newProductName, price: newProductPrice, url: productUrl}
        )
    };
    //agregar imagen para la base de datos;

    // console.log("valor del estado:",newProductImage)

    //traer los datos del usuario

    const navigate = useNavigate()
    const [error, setError] = useState('');
    const { user, logout } = useAuth();

    const handleLogout = async () => {
        try {
            await logout();
            // navigate('/')
        } catch (error) {
            setError('ups, parece ocurrio un error')
        }
    } 

  return (
    <div className='dashboard'>
        {/* <div>{error && <p>{error}</p>}</div> */}
        <div className='dashboard__navbar'>
            <h2 className='dashboard__welcome'>Bienvenido {user.email}</h2>
            <p className='dashboard__option'>Hola aqui tendras tu dashBoard</p> 
            
            <div className='dashboard__button'>
                <button onClick={handleLogout}>salir</button>
            </div>
        </div>
        <div className='dashboard_content'>
            <h1>Favoritos</h1>
            <h2>aqui estaran los productos a los que les distes like</h2>
            <div>
        <div className="mb-3">
          <label  className="form-label">nombre de producto</label>
          <input 
          type="text" 
          className="form-control" 
          placeholder="nombre de producto" 
          onChange={(event)=>{
              setNewProductName(event.target.value);
            }}
          />
        </div>
        <div className="mb-3">
          <label  className="form-label">precio de producto</label>
          <input
          type="number" 
          className="form-control" 
          placeholder="nombre de producto" 
          onChange={(event)=>{
              setNewProductPrice(event.target.value);
            }}
          />
        </div>
        <div className="mb-3">
          <label  className="form-label">subir imagen</label>
          <input
          type="file" 
          className="form-control" 
          placeholder="seleciona una imagen" 
          onChange= {fileHandler}
          />
        </div>
       
        <button type="submit" className="btn btn-primary" onClick={addProduct} >agregar</button>
    </div>
        </div>
        {/* {userHome ? <p> bienvenido {userHome.email}</p> : "" } */}
    </div>
  )
}

export default UserDashBoard
