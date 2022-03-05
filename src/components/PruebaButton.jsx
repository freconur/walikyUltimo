import React, { useEffect, useState } from 'react'
import app from '../firebase/firebase.config'
import { getFirestore, collection, addDoc } from 'firebase/firestore'

const db = getFirestore(app);

const PruebaButton = () => {
  
  // const [nombre, setNombre] = useState('')
  const collectionTazas = collection(db, 'tazas');
  const [cambiandoNombre, setCambiandoNombre] = useState('')
  

    const handleButton = (e) => {
      const name = e.target.name;
        console.log(name);
         switch(name) {
           case 'tazas':
           return setCambiandoNombre(collectionTazas)
          }
          console.log('valor:', cambiandoNombre)
      };
  return (
    <div>
      <button
      onClick={handleButton}
      name='tazas'
      >cambio</button>
    </div>
  )
}

export default PruebaButton
