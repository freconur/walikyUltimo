import React from 'react'
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
const UserName = () => {
    const { user } = useAuth()
	const userNavbar = user?.email;
// el css se encuentra en el css del navbar
  return (
    <>
        <Link to="/user" className="user">
            Bienvenido<br/> {userNavbar}
        </Link>
    </>
  )
}

export default UserName
