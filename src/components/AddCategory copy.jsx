import React, { useState } from 'react'
import Select from "react-select";


  // const AddCategory = (props) => {
  const AddCategory = ({inputInitial, handleChangeInput, category, submitHandler, setNewProductName, setNewProductPrice, handleCategory, fileHandler}) => {
    const initialValueInput = {
      name: "",
      price: "",
      category: "",
      image: "",
    }
    const [inputInitial, setInputInitial] = useState(initialValueInput);
    
    const handleChangeInput = () => {
      const { name, value } = e.target
        setInputInitial({...inputInitial, [name]: value})
    }
 
    const options = [
    { value: "cojines", label: "cojines" },
    { value: "bts_polos", label: "bts_polos" },
    { value: "disneyPolos", label: "disneyPolos" },
  ];

  return (
    <div className="dashboard_content">
        <h1>Agrega nuevos items a la coleccion de {category}</h1>
        <form onSubmit={submitHandler}>
          <div className="mb-3">
            <label className="form-label">nombre de producto</label>
            <input
              type="text"
              className="form-control"
              value={inputInitial.name}
              placeholder="nombre de producto"
              onchange={handleChangeInput}
              // onChange={(event) => {
              //   setNewProductName(event.target.value);
              // }}
            />
            <div className="mb-3">
              <label className="form-label">precio de producto</label>
              <input
                type="number"
                className="form-control"
                placeholder="nombre de producto"
                onchange={handleChangeInput}
                // onChange={(event) => {
                //   setNewProductPrice(event.target.value);
                // }}
              onchange={handleChangeInput}
                value= {inputInitial.price}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Categoria: </label>
              <Select 
              // onChange={handleCategory}
              onChange={handleChangeInput} 
              options={options} 
              value={inputInitial.category}
              />

            </div>
            <div className="mb-3">
              <label className="form-label">subir imagen</label>
              <input
                // value={values.image}
                type="file"
                className="form-control"
                placeholder="seleciona una imagen"
                onChange={fileHandler}
              />
            </div>
            <button
              className="btn btn-primary"
            >
              agregar
            </button>
          </div>
        </form>
      </div>
  )
}

export default AddCategory
