import React from 'react'
import headerImage from '../assets/images/header-image.jpg'
import '../styles/Header.css'
const Header = () => {
  return (
    <div className="header">
        <img className="header__image" src={headerImage} alt="logo" />
    </div>
  )
}

export default Header
