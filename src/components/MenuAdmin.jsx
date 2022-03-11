import { Link } from "react-router-dom";
import React from 'react';

const MenuAdmin = ({handleLogout}) => {
    

    return(
        <ul className="MenuUser">
        <li>
          <Link to="/user">dashboard</Link>
        </li>
        <li>
          <Link to="/favoritos">Favoritos</Link>
        </li>
        <li>
          <p onClick={handleLogout}>Salir</p>
        </li>
      </ul>
    )

}

export default MenuAdmin;