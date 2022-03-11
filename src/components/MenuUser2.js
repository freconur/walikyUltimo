import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import app from "../firebase/firebase.config";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import MenuAdmin from './MenuAdmin'
import MenuUsuario from './MenuUsuario'
import '../styles/MenuUser.css'
const db = getFirestore(app);
const MenuUser2 = ({user, logout }) => {
  const [rolAdmin, setRolAdmin] = useState("");
  const [menuState, setMenuState] = useState(false)

  useEffect(()=> {
    const getAdmin = async () => {
      const docRef = doc ( db, "userName", user.uid)
      const dataDoc = await getDoc(docRef)
        setRolAdmin(dataDoc.data().rol)
    }
    getAdmin()
  },[user.uid]);

  const handleLogout = async() =>{
    await logout()
  }
  const MenuSelect = () => {
    if(rolAdmin === "admin"){
     return <MenuAdmin handleLogout={handleLogout} />
    } else if (rolAdmin === "usuario"){
      <MenuUsuario handleLogout={handleLogout}/>
    }
    return (
      <></>
    )
  }
  return (
		<div >
      <MenuSelect/>
    </div>
	);
};

export default MenuUser2;
