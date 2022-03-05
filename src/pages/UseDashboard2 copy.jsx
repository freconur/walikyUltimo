import React, { useState, useEffect } from "react";
import app from "../firebase/firebase.config";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Select from "react-select";
import "../styles/UserDashboard.css";

const db = getFirestore(app);
const storage = getStorage(app);

const UserDashboard2 = () => {
  const [productUrl, setProductUrl] = useState("");
  const collectionProduct = collection(db, "productos");
  const [newProductName, setNewProductName] = useState("");
  const [newProductPrice, setNewProductPrice] = useState(0);
  const [newCategory, setNewCategory] = useState("");
  const [changeCategory, setChangeCategory] = useState("")

  // const [addCategory, setAddCategory] = useState(options)
  const options = [
    { value: "cojines", label: "cojines" },
    { value: "bts_polos", label: "bts_polos" },
    { value: "disneyPolos", label: "disneyPolos" },
  ];
  //logica para agregar datos a la base de datos
  const fileHandler = async (e) => {
    //detectar archivos
    const archivoLocal = e.target.files;
    //cargarlo a firebase storage
    const archivoRef = ref(storage, `tazas/${archivoLocal.name}`);
    await uploadBytes(archivoRef, archivoLocal);
    //obtener url de descarga
    const url = await getDownloadURL(archivoRef);
    console.log(url);
    setProductUrl(url);
  };

  //valores del select option
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
  const handleCategory = (value) => {
    console.log(value.value);
    setNewCategory(value.value);
    // console.log("valor del select:",newCategory);
  };

  const navigate = useNavigate();
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
    console.log(name)
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

        <form onSubmit={submitHandler}>
          <div className="mb-3">
            <label className="form-label">nombre de producto</label>
            <input
              type="text"
              className="form-control"
              placeholder="nombre de producto"
              onChange={(event) => {
                setNewProductName(event.target.value);
              }}
            />
            <div className="mb-3">
              <label className="form-label">precio de producto</label>
              <input
                type="number"
                className="form-control"
                placeholder="nombre de producto"
                onChange={(event) => {
                  setNewProductPrice(event.target.value);
                }}
              />
            </div>
            {/* // se eligira la categoria para que los archivos que se vayan a subir no siempre sean de tazas si no de cualquier categoria */}
            <div className="mb-3">
              <label className="form-label">Categoria: </label>
              <Select onChange={handleCategory} options={options} />

              {/* imput para agregar los valores al select, pero no funciono, asi que lo dejamos aqui nada  mas */}
              {/* <div className="mb-3">
                <label className="form-label">nueva categoria</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="nombre de categoria"
                  onChange={(event) => {
                    setNewCategory(event.target.value);
                  }}
                />
                <button className="btn btn-primary" onClick={agregarElemento}>agregar categoria</button>
              </div> */}
              {/* <option value="tazas">bts_polos</option>
                  <option value="cojin">cojines</option>
                  <option value="polos">disneyPolos</option> */}
            </div>
            <div className="mb-3">
              <label className="form-label">subir imagen</label>
              <input
                type="file"
                className="form-control"
                placeholder="seleciona una imagen"
                onChange={fileHandler}
              />
            </div>
            <button
              //   type="submit"
              className="btn btn-primary"
              //   onClick={addProduct}
            >
              agregar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserDashboard2;
