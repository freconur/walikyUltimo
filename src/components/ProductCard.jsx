import React, { useState } from 'react'
// import { Link } from 'react-router-dom'
import "../styles/ProductCard.css"
import ModalProduct from "../Modals/ModalProduct"
const ProductCard = ({prod}) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <li className="product__container">
        {/* <Link onClick={() => {setIsOpen(true)}} className="product__link" to={"/cojin/" + prod.id} >
            <img className="product__image" src={prod.image} alt={prod.name} />
        </Link> */}
        <div onClick={() => setIsOpen(true)} className="product__link">
            <img className="product__image" src={prod.image} alt={prod.name} />
        </div>
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
