import React, { useState, useEffect } from 'react';
import '../styles/Navbar.css'
import {Link} from 'react-router-dom';
import AuthButton from './AuthButton';
import Logo from '../assets/images/waliky-logo.png'
import iconMenu from '../assets/icons/bars-solid.svg'
import { useAuth } from '../context/AuthContext';
import UserName from './UserName';
import NavbarList from './NavbarList';
import '../styles/Navbar_res.css'

const Navbar = () => {

	const [toogle, setToogle] = useState(false);

	const { user } = useAuth()
	const userNavbar = user?.email;

	const handleClick = () => {
		setToogle(!toogle)
	}

	return (
		<div className="Navbar">
			<div className="Navbar__container">
				<div className="Navbar__container-logo">
					<Link to="/">
						<img className="Navbar-logo" src={Logo} alt="logo" />
					</Link>
				</div>
					<NavbarList />
					<div className="userOption">
						{userNavbar ? <UserName/> : <AuthButton />}
					</div>
			</div>
			<div className="Navbar__menuBurger" onClick={handleClick}> 
			{/* <FontAwesomeIcon icon="fa-solid fa-bars" /> */}
			<div className='iconMenu__container'>
				<img className="iconMenu__image" src={iconMenu} alt="iconMenu" />
			</div>
			</div>
			 
			
				<ul className={`Menu ${toogle ? 'Menu-active' : ''}`}>
					<li className="Menu__li">
						<Link className="Menu__list" to='/' >Blog</Link>
					</li>
					<li className="Menu__li">
						<Link className="Menu__list" to='/'>Contactanos</Link>
					</li>
					<li className="Menu__li">
						<Link className="Menu__list" to='/' >Nosotros</Link>
					</li>
					<li className="Menu__li">
						<Link className="Menu__list" to='/' >categoria</Link>
					</li>
				</ul>
    	
		</div>
	)
}

export default Navbar