import React, { useState, useEffect } from "react";
import db from "../firebase/firebase.config";
import { collection, getDocs } from "firebase/firestore";
import ProductCard from "../components/ProductCard";
// import ModalProduct from "../Modals/ModalProduct";
// import Producto from "../components/Producto";
import "../styles/productContainer.css";
import '../styles/res/productContainer_res.css'
import PageLoading from "./PageLoading";

const prueba = () => {
  return (
    <div>
      
    </div>
  )
}

export default prueba
