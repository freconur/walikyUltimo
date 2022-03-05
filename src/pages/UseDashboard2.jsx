import React, { useState } from "react";
import app from "../firebase/firebase.config";
import { useAuth } from "../context/AuthContext";
// import { Link, useNavigate } from "react-router-dom";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import AddCategory from '../components/AddCategory'
import "../styles/UserDashboard.css";

const db = getFirestore(app);
const storage = getStorage(app);

const UserDashboard2 = () => {
  const collectionProduct = collection(db, "productos");
  const [productUrl, setProductUrl] = useState("");
  const [newProductName, setNewProductName] = useState("");
  const [newProductPrice, setNewProductPrice] = useState(0);
  const [newCategory, setNewCategory] = useState("");
  const [changeCategory, setChangeCategory] = useState("")

  // const [addCategory, setAddCategory] = useState(options)
  
  //logica para agregar datos a la base de datos
  const fileHandler = async (e) => {
    //detectar archivos
    const archivoLocal = e.target.files[0];
    //cargarlo a firebase storage
    const archivoRef = ref(storage, `tazas/${archivoLocal.name}`);
    await uploadBytes(archivoRef, archivoLocal);
    //obtener url de descarga
    const url = await getDownloadURL(archivoRef);
    console.log(url);
    setProductUrl(url);
  };
  
  const handleCategory = (value) => {
    console.log(value.value);
    setNewCategory(value.value);
    // console.log("valor del select:",newCategory);
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    await addDoc(collectionProduct, {
      name: newProductName,
      price: newProductPrice,
      url: productUrl,
      category: newCategory,
    });
    // console.log(category)
  };

  // const navigate = useNavigate();
  const [error, setError] = useState("");
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      // navigate('/')
    } catch (error) {
      setError("ups, parece ocurrio un error");
    }
  };
  //cambiando el valor de los button del navbar del dashboard
  const handleChange = (e) => {
    const name = e.target.name;
    console.log(name);
    setChangeCategory(name)
  }

  //instento de agregar nuevos valores al componente
  // const agregarElemento = () => {
  //     setAddCategory([...options, {value: newCategory, label: newCategory}])
  //     console.log(addCategory)
  // }

  return (
    <div className="dashboard">
      <div className="dashboard__navbar">
        <h2 className="dashboard__welcome">bienvenido {user.email} </h2>
        <div className="dashboard__option">
            <p>Agregar</p>
            <button 
            name="cojines"
            onClick={handleChange}
            className="btn btn-primary">Cojin</button>    
            <button className="btn btn-primary">Tazas</button>    
            <button className="btn btn-primary">Polos</button>    
        </div>
        <div className="dashboard__button">
          <button onClick={handleLogout}>salir</button>
        </div>
      </div>

      <div className="dashboard_content">
        <h1>Agrega nuevos items a la coleccion</h1>
        <h2>llena los espacios</h2>

        <AddCategory
        submitHandler={submitHandler}
        setNewProductName={setNewProductName}
        setNewProductPrice={setNewProductPrice}
        handleCategory={handleCategory}
        fileHandler={fileHandler}
        />
      </div>
    </div>
  );
};

export default UserDashboard2;
