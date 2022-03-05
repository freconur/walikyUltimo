import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Category.css'
import '../styles/Category_responsive.css'
import tazasCategory from '../assets/images/tazasCategory.jpg';
import cojinCategory from '../assets/images/cojinCategory.jpg';
import polosCategory from '../assets/images/polosCategory.jpg';
const Category = () => {
  return (
    <React.Fragment>
        <div className="category">
            <section className="category__container">
                <Link to="/tazas" className="card__category" >
                    <img className="category__image" src={tazasCategory}  alt ="tazas" />
                </Link>
                <Link to="/cojin" className="card__category" >
                    <img className="category__image" src={cojinCategory}  alt ="cojin" />
                </Link>
                <Link to="/polos" className="card__category" >
                    <img className="category__image" src={polosCategory}  alt ="polos" />
                </Link>
            </section>
        </div>
    </React.Fragment>
  )
}

export default Category
