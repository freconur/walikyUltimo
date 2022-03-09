import React, { useState } from 'react'
import app from '../firebase/firebase.config'
import { getFirestore, collection, query, getDocs, doc, setDoc  } from 'firebase/firestore'
import { useAuth } from '../context/AuthContext'
import "../styles/ProductCard.css"
import ModalProduct from "../Modals/ModalProduct"

const db = getFirestore(app)
const ProductCard = ({prod}) => {
  const { user } = useAuth()
  // const idProduct = prod.id
  // console.log("valor de idProduct:", idProduct)
  const [isOpen, setIsOpen] = useState(false)

  const handleLike = async() => {
    // const idProduct = prod.id
    // const userInfo = user.uid
    // console.log("valor de userInfo:", userInfo)
    // console.log("valor de idproduct:", idProduct)
    // const docuRef = doc(db,`userName/${userInfo}/favoritos`)
    // console.log(docuRef)
    // debugger 
    const q = query(collection(db, "userName"));
        const querySnapshot = await getDocs(q);
        const queryData = querySnapshot.docs.map((data) => ({...data.data(), id: data.id,}));
        console.log(queryData);
        queryData.map(async (v) => {
          await setDoc(doc(db, `userName/${v.id}/favProduct`, prod.id), {
              name: prod.name,
              price: prod.price,
              collection: prod.collection,
              image: prod.image,
              category: prod.category
              // currentLocation: details.currLoc,
            });
          })
        };
  
  return (
    <li className="product__container">
        {/* <Link onClick={() => {setIsOpen(true)}} className="product__link" to={"/cojin/" + prod.id} >
            <img className="product__image" src={prod.image} alt={prod.name} />
        </Link> */}
        <div onClick={() => setIsOpen(true)} className="product__link">
            <img className="product__image" src={prod.image} alt={prod.name} />
        </div>
            <span onClick={handleLike}>me gusta</span>
        {/* <ModalProduct open={isOpen} onClose={() => setIsOpen(false)} > */}
        <ModalProduct open={isOpen} >
          <img className="product__image--modal" src={prod.image} alt={prod.name}/>
          <div className="product__name--modal">
            <h2 className="product__title--modal">{prod.name}</h2>
            <p  onClick={() => setIsOpen(false)}  className="product__close">cerrar</p>
          </div>
        </ModalProduct >
    </li>
  )
}

export default ProductCard;
