import React from 'react'
import ModalProduct from '../Modals/ModalProduct';
const Producto = ({product, handleOnClick, isOpen, handleOnClose}) => {
  return (
    <div>
      {product.map((prod) => {
            
            return (
              <div onClick={handleOnClick} className="product__container" key={prod.id}>
                <img
                  className="product__image"
                  src={prod.image}
                  alt={prod.nombre}
                />
              <ModalProduct open={isOpen} onClose={handleOnClose}  />
              </div>
              
              );
            })}
    </div>
  ) 
}

export default Producto
