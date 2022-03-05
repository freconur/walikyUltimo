import React from 'react';
import { Link } from 'react-router-dom';
import Category from '../components/Category';
import Header from '../components/Header';
import { useAuth } from '../context/AuthContext';
import '../styles/Home.css';
import '../styles/Home_res.css';
const Home = () => {
  const {user} = useAuth();
  const userHome = user?.email
  // console.log('estado:',userHome)
 
  return ( 
    <div className="Home">
      {/* <Link to="user">
         { userHome ?
          <p> bienvenido {userHome}</p> : "" }
      </Link> */}
      <div className="Home__container">
        <Header />
        <Category />

      </div>
        
    </div>
  )
}

export default Home
