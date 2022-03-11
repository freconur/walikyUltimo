import { Link } from "react-router-dom";
import React from 'react';

const MenuUsuario = ({handleLogout}) => {
    

    return(
        <ul className="MenuUser">
        <li>
          <Link to="/favoritos">Favoritos</Link>
        </li>
        <li>
          <p onClick={handleLogout}>Salir</p>
        </li>
      </ul>
    )

}

export default MenuUsuario;