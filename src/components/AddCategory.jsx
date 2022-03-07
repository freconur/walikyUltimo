import React, { useState } from "react";
import Select from "react-select";
import { getFirestore, collection } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import app from "../firebase/firebase.config";
import { useForm } from "react-hook-form";

const storage = getStorage(app);
const db = getFirestore(app);
const AddCategory = ({ submitHandler }) => {
  const initialValueInput = {
    name: "",
    price: "",
    category: "",
    collection: "",
    image: "",
  };
  const [inputInitial, setInputInitial] = useState(initialValueInput);
  //variables para volver dinamica la seleccion de valores de la coleccion
  const categoryCollections = {
    cojines: collection(db, "cojines"),
    tazas: collection(db, "tazas"),
    polos: collection(db, "polos"),
  };
  const imageCollection = {
    cojines: "cojines",
    tazas: "tazas",
    polos: "polos",
  };
  // useState para los valores del select en la colleccion
  const [imageCollections, setImageCollections] = useState("");
  const [categorys, setCategorys] = useState("");
  const [saveImage, setSaveImage] = useState(false);
  const [enableImage, setEnableImage] = useState(true)
  //aqui comienza la funcion de para los cambios de valores de las colleciones
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setInputInitial({ ...inputInitial, [name]: value });
  };
  const handleImageCollection = (e) => {
    const name = e.target.value;
    if (name === "cojines") {
      setCategorys(categoryCollections.cojines);
      setImageCollections(imageCollection.cojines);
    } else if (name === "tazas") {
      console.log("taza");
      setCategorys(categoryCollections.tazas);
      setImageCollections(imageCollection.tazas);
    } else if (name === "polos") {
      console.log("polos");
      setCategorys(categoryCollections.polos);
      setImageCollections(imageCollection.polos);
    }
    setEnableImage(!enableImage)
    setInputInitial({ ...inputInitial, collection: name });
  };
  const handleChangeCategory = (e) => {
    const name = e.target.value;
    setInputInitial({ ...inputInitial, category: name });
  };

  const fileHandler = async (e) => {
    const archivoLocal = e.target.files[0];
    const archivoRef = ref(storage, `${imageCollections}/${archivoLocal.name}`);
    await uploadBytes(archivoRef, archivoLocal);
    const url = await getDownloadURL(archivoRef);
    console.log("se cargo la imagen");
    setInputInitial({ ...inputInitial, image: url });
    setSaveImage(!saveImage);
    debugger
  };
  //funcion de react hook form
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    submitHandler({ ...data, image: inputInitial.image }, categorys);
    setEnableImage(!enableImage)
    setSaveImage(!saveImage);
    debugger
    reset();
  };
  return (
    <div className="dashboard_content">
      <h1>Agrega nuevos items a la coleccion</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <div className="mb-3">
            <label>Collecion</label>
            <select
              {...register("collection", { required: true })}
              name="collection"
              onChange={handleImageCollection}
            >
              <option value="">selecciona una collecion</option>
              <option value="cojines">cojines</option>
              <option value="tazas">tazas</option>
              <option value="polos">polos</option>
            </select>
            {errors.collection?.type === "required" && "First name is required"}
          </div>
          <div className="mb-3">
            <label className="form-label">subir imagen</label>
            <input
              disabled={enableImage}
              {...register("image", { required: true })}
              name="image"
              type="file"
              className="form-control"
              onChange={fileHandler}
            />
          </div>
          {errors.image?.type === "required" && "First name is required"}
          {saveImage && "se cargo la imagen"}
          <div>
            <label className="form-label">nombre de producto</label>
            <input
              {...register("name", { required: true })}
              name="name"
              type="text"
              className="form-control"
              placeholder="nombre de producto"
              onChange={handleChangeInput}
            />
            {errors.name?.type === "required" && "First name is required"}
          </div>
          <div className="mb-3">
            <label className="form-label">precio de producto</label>
            <input
              {...register("price", { required: true })}
              name="price"
              type="number"
              className="form-control"
              placeholder="nombre de producto"
              onChange={handleChangeInput}
            />
            {errors.price?.type === "required" && "First name is required"}
          </div>
          <div className="mb-3">
            <label className="form-label">Categoria: </label>
            <select
              name="category"
              onChange={handleChangeCategory}
              {...register("category", { required: true })}
            >
              <option value="">Selecciona una categoria</option>
              <option value="bts">bts</option>
              <option value="disney">disney</option>
              <option value="butter">butter</option>
              <option value="cumpleaños">cumpleaños</option>
              <option value="amistad">amistad</option>
              <option value="dia del padre">dia del padre</option>
              <option value="dia de la madre">dia de la madre</option>
              <option value="alianza lima">alianza lima</option>
              <option value="star wars">star wars</option>
              <option value="personzalido">personzalido</option>
            </select>
            {errors.category?.type === "required" && "First name is required"}
          </div>

          <div>
            <button className="btn btn-primary">agregar</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddCategory;
