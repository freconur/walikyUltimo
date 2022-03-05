import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { collection, getDocs } from "firebase/firestore";
import db from "../firebase/firebase.config";
const ProductId = () => {
    const {productId} = useParams();
    // console.log("id" ,productId);
    const [produ, setProdu] = useState(null);
    // const [produ, setProdu] = useState(null);
    useEffect(() => {
     const getProduct = async () => {
            const item = await getDocs(collection(db, "cojines"));
            const docs = [];
            item.forEach((doc) => {
             docs.push({...doc.data(), id: doc.id} );
            });
            const newProduct = docs.find((item) => item.id === productId);
            setProdu(newProduct)
          };
          getProduct();
        }, []);

   
    if (!produ) {
      return null;
    }
    // if(produ === true)
    
  return (
    <div>
      <div>
        <h1>{produ.id}</h1>
        <img src={produ.image}  alt={produ.name}/>
      </div>
    </div>
  )
}

export default ProductId