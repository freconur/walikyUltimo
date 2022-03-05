import React, { useState, useEffect } from 'react'
import app from '../firebase/firebase.config'
import { useAuth } from '../context/AuthContext'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { getFirestore, collection, addDoc } from 'firebase/firestore'
import AddCategory from '../components/AddCategory'
import '../styles/UserDashboard.css'

const db = getFirestore(app);
const storage = getStorage(app);

const Dashboard_prueba = () => {

    const { user, logout } = useAuth();
    const handleLogout = async () => {
        try {
          await logout();
          // navigate('/')
        } catch (error) {
          error("ups, parece ocurrio un error");
        }
      };
      
      
      //lo que podria hacer es tambien pasar el collectiProduct a un estado y asi jugar con los valores
      const [collectionCategory, setCollectionCategory] = useState("")
      const [productUrl, setProductUrl] = useState("");
      const [newProductName, setNewProductName] = useState("")
      const [newProductPrice, setNewProductPrice] = useState(0);
      const [newCategory, setNewCategory] = useState("")
      const [category, setCategory] = useState("")
      const collectionCojines = collection (db, 'cojines');
      const collectionTazas = collection (db, 'tazas');
      const collectionPolos = collection (db, 'polos');
      const directionImagePolos = 'polos';
      const directionImageCojines = 'cojines';
      const directionImageTazas = 'tazas';
      const [directionImage, setDirectionImage] = useState("");
      const [categoryActive, setCategoryActive] = useState(false);
      const [none, setNone] = useState(false);

      //sirve para cambiar la colleccion
    const handleChange = (e) =>{
        setNone(true)
        const name = e.target.name;
        if (name === 'cojines') {
          return (
            setCollectionCategory(collectionCojines),
            setDirectionImage(directionImageCojines),
            setCategory(name)
            )
        } else if (name === 'tazas') {
          return (
            setCollectionCategory(collectionTazas), 
            setDirectionImage(directionImageTazas),
            setCategory(name)
            // setCategoryActive(!categoryActive)
          )
        } else if ( name === 'polos') {
          return (
            setCollectionCategory(collectionPolos),
            setDirectionImage(directionImagePolos),
            setCategory(name)
            // setCategoryActive(!categoryActive)
            )
        }
    }
    //sirve para cambiar la direccion de done se van a guardar las imagenes que subimos
    const fileHandler = async (e) => {
      const archivoLocal = e.target.files[0];
      const archivoRef = ref(storage, `${directionImage}/${archivoLocal.name}`);
      await uploadBytes(archivoRef, archivoLocal);
      const url = await getDownloadURL(archivoRef);
        console.log('se cargo la imagen');
        // console.log(setProductUrl(url));
        setProductUrl(url);
    }
    const submitHandler = async(e) => {

      console.log()

        e.preventDefault();
        await addDoc( collectionCategory, {
            name: newProductName,
            price: newProductPrice,
            image: productUrl,
            category: newCategory
        })
        e.target.value = "";
    }
    const handleCategory = (value) => {
        console.log(value.value);
        setNewCategory(value.value);
      };
      

  return (
    <div className="dashboard">
      <div className="dashboard__navbar">
        <h2 className="dashboard__welcome">bienvenido {user.email} </h2>
        <div className="dashboard__option">
            <div onClick={()=> setCategoryActive(!categoryActive)}>Agrega Items</div>
            {categoryActive &&
            <div>
              <button 
              name='cojines'
              onClick={handleChange}
              className="btn btn-primary dashboardButton">Cojin</button>    
              <button
              name='tazas'
              onClick={handleChange}
              className="btn btn-primary dashboardButton">Tazas</button>    
              <button 
              name='polos'
              onClick={handleChange}
              className="btn btn-primary dashboardButton">Polos</button>    
            </div>
            }
        </div>
        <div className="dashboardButton">
          <button onClick={handleLogout}>salir</button>
        </div>
      </div>
      <div className="dashboard_content">
        {categoryActive &&
        <div className={`category__button ${none ? 'dashboardCategory__active' : ''}`}>
          <AddCategory
          submitHandler={submitHandler}
          setNewProductName={setNewProductName}
          setNewProductPrice={setNewProductPrice}
          handleCategory={handleCategory}
          fileHandler={fileHandler}
          inputInitial={inputInitial}
          category={category}
          handleChangeInput={handleChangeInput}
          />
        </div>
      }
      </div>
    </div>
  )
}

export default Dashboard_prueba
