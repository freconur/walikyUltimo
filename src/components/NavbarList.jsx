import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/NavbarList.css'
// import '../styles/Navbar_res.css'
const NavbarList = () => {
  return (
    <ul className="Navbar__list">
      <Link to='/blog' className="Navbar__list--section ">Blog</Link>
			<Link to='/contactanos' className="Navbar__list--section">Contactanos</Link>
			<Link to='/nosotros' className="Navbar__list--section">Nosotros</Link>
    </ul >
  )
}

export default NavbarList
