import React, { useState, useEffect } from "react";
import app from "../firebase/firebase.config"
import { getFirestore, collection, getDocs } from "firebase/firestore";
import ProductCard from "../components/ProductCard";
// import ModalProduct from "../Modals/ModalProduct";
// import Producto from "../components/Producto";
import "../styles/productContainer.css";
import '../styles/productContainer_res.css'
import PageLoading from "./PageLoading";
const db = getFirestore(app)
const Cojin = () => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true)
    const getProduct = async () => {
      const item = await getDocs(collection(db, "cojines"));
      const docs = [];
      item.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      setProduct(docs);
      setLoading(false)
    };
    getProduct();
  }, []);
  if (!product) {
    return null;
  }
  
  return (
    <React.Fragment>
      <div className="container__prod">
        <h1 className="product__title">Cojines</h1>
        <div>
          {loading && <PageLoading/>}
          <ul className="container__products">
            {product.map((prod) => (
              <ProductCard key={prod.id} prod={prod} />
            ))}
          </ul>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Cojin;
