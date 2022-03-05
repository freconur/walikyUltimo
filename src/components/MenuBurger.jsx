import React from "react";
import '../styles/MenuBurger.css'
const MenuBurger = () => {
  return (
    <div >
      <ul className="Menu">
        <li>
          <a href="/" className="title">
            My orders
          </a>
        </li>
        <li>
          <a href="/">My account</a>
        </li>
        <li>
          <a href="/">Sign out</a>
        </li>
      </ul>
    </div>
  );
};

export default MenuBurger;
