import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCaretDown} from '@fortawesome/free-solid-svg-icons'
import app from "../firebase/firebase.config";
import { getFirestore } from "firebase/firestore";
import MenuUser from '../components/MenuUser'

const db = getFirestore(app);
const UserName = () => {
  const { user, logout } = useAuth()

  // const [userAdmin, setUserAdmin] = useState(false)
	const userNavbar = user?.email;
  const [toggle, setToggle] = useState(false)

  const handleUserClick = () => {
    setToggle(!toggle)
  }
// el css se encuentra en el css del navbar
  return (
    <>
      <div className={`userNavbar ${toggle ? "userActive" : ""}`}>
        <div onClick={handleUserClick} className="user">
         <span>Bienvenido</span>  
         <div className="userNavbar__container">
          <div className='userName'>
            {userNavbar}
          </div>
          <div className='arrow-down'>
            <FontAwesomeIcon icon={faCaretDown} />
          </div>
          </div> 
        </div>
        
      </div>
        {toggle && <MenuUser user={user} logout={logout} />}
    </>
  )
}

export default UserName
