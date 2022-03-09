import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
// import app from '../firebase/firebase.config'
import { addDoc } from 'firebase/firestore'
import AddCategory from '../components/AddCategory'
import '../styles/UserDashboard.css'
import { Link } from 'react-router-dom'

// const db = getFirestore(app);


const Dashboard_prueba = () => {

    const { user, logout } = useAuth();
    const handleLogout = async () => {
        try {
          await logout();
          // navigate('/')
        } catch (error) {
          error("ups, parece ocurrio un error");
        }
      };
    const submitHandler = async(data, categorys) => {
      debugger
      await addDoc(categorys, data)
    }
  return (
    <div className="dashboard">
      <div className="dashboard__navbar">
        <h2 className="dashboard__welcome">bienvenido {user.email} </h2>
        <div className="dashboardButton">
          <Link to="/favoritos">
            <button>
              Favoritos
            </button>
          </Link>
          <button onClick={handleLogout}>salir</button>
        </div>
      </div>
      <div className="dashboard_content">
          <AddCategory
          submitHandler={submitHandler}
          />
        </div>
      </div>
  )
}

export default Dashboard_prueba
