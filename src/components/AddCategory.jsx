import React, { useState } from 'react'
import Select from "react-select";
import { getFirestore, collection } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import app from '../firebase/firebase.config'
import { useForm } from 'react-hook-form';

const storage = getStorage(app);
const db = getFirestore(app);
  const AddCategory = ({submitHandler}) => {
    const initialValueInput = {
      name: "",
      price: "",
      category: "",
      image: ""
    }
    const [inputInitial, setInputInitial] = useState(initialValueInput);
    //variables para volver dinamica la seleccion de valores de la coleccion
    const categoryCollections = {
      cojines: collection (db, 'cojines'),
      tazas: collection (db, 'tazas'),
      polos: collection (db, 'polos'),
    }
    const imageCollection = {
      cojines: "cojines",
      tazas: "tazas",
      polos: "polos"
    }
    // useState para los valores del select en la colleccion
    const [imageCollections, setImageCollections] = useState("")
    const [categorys, setCategorys] = useState("")
    const [saveImage, setSaveImage] = useState(false)
    const [image, setImage] = useState("")

    //aqui comienza la funcion de para los cambios de valores de las colleciones
    const handleChangeInput = (e) => {
      const { name, value } = e.target;
        setInputInitial({...inputInitial, [name]: value})
      }
    const handleImageCollection = (e) => {
      const name = e.target.value
      if(name === 'cojines') {
        setCategorys(categoryCollections.cojines)
        setImageCollections(imageCollection.cojines)
        } else if (name === 'tazas'){
          console.log("taza")
          setCategorys(categoryCollections.tazas)
          setImageCollections(imageCollection.tazas)
        } else if (name === 'polos') {
          console.log("polos")
         setCategorys(categoryCollections.polos)
         setImageCollections(imageCollection.polos)
      }
    }
    // const handleChangeCategory = (e) => {
    //     const name = e.target.value
    //     setInputInitial({...inputInitial, category: name})
    // }

      const fileHandler = async (e) => {
        const archivoLocal = e.target.files[0];
        const archivoRef = ref(storage, `${imageCollections}/${archivoLocal.name}`);
        await uploadBytes(archivoRef, archivoLocal);
        const url = await getDownloadURL(archivoRef);
        console.log('se cargo la imagen');
        // setInputInitial({...inputInitial, image: url});
        setImage(url)
        setSaveImage(!saveImage)
      }
    // const handleSubmit = (e) => {
    //   e.preventDefault()
    //   submitHandler({...inputInitial}, categorys)
    //   reset()
    //   // setInputInitial({...initialValueInput,})
    // }
    const {register, formState: {errors}, handleSubmit} = useForm();
      const onSubmit = (data, e) => {
        submitHandler(data, categorys)
        // submitHandler({...data, image: image, collection: imageCollections}, categorys)
        // submitHandler(inputInitial, categorys)
        // submitHandler(data, categorys)
        // setInputInitial({...initialValueInput})
        e.target.reset()
        // setSaveImage(!saveImage)
      }
    return (
      <div className="dashboard_content">
        <h1>Agrega nuevos items a la coleccion</h1>
        {/* <form onSubmit={handleSubmit}> */}
        <div className="mb-3">
              <label className="form-label">subir imagen</label>
              <input
              // {...register("image", { required: true })}
              // name="image"
              type="file"
              className="form-control"
              placeholder="seleciona una imagen"
              onChange={fileHandler}
              />
            </div>
            {saveImage && "se cargo la imagen"}
            {/* {errors.image?.type === 'required' && "First name is required"} */}
        <div className='mb-3'>
            <label>Collecion</label>
            <select 
            // name="collection"
            onChange={handleImageCollection}
            // {...register("collections",{ required: true })}
            >
              <option value="">selecciona una collecion</option>
              <option value="cojines">cojines</option>
              <option value="tazas">tazas</option>
              <option value="polos">polos</option>
            </select>
        </div>
          {/* <span>{errors.collections && "selecciona una collecion"}</span> */}
        <form 
        onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-3">
              
            <div>
              <label className="form-label">nombre de producto</label>
              <input
                {...register("name", { required: true })}
                name="name"
                type="text"
                className="form-control"
                placeholder="nombre de producto"
                onChange={handleChangeInput}
                // value={inputInitial.name}
              />
            </div>
            {errors.name?.type === 'required' && "nombre es requerido"}
            <div className="mb-3">
              <label className="form-label">precio de producto</label>
              <input
              {...register("price", { required: true })}
                name="price"
                type="number"
                className="form-control"
                placeholder="nombre de producto"
                onChange={handleChangeInput}
                // value={inputInitial.price}
              />
            </div>
            {errors.price?.type === 'required' && "First name is required"}
            <div className="mb-3">
              <label className="form-label">Categoria: </label>
              <select
              {...register("category", { required: true })}
              name="category"
              // onChange={handleChangeCategory}
              >
                <option value="">Selecciona una categoria</option>
                <option value="bts">bts</option>
                <option value="disney">disney</option>
                <option value="butter">butter</option>
              </select>
            </div>
            {errors.category?.type === 'required' && "First name is required"}
            
            <div>
            <button
              className="btn btn-primary"
            >
              agregar
            </button>
              
            </div>
          </div>
        </form>
      </div>
  )
}

export default AddCategory

