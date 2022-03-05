import React from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import Layout from '../containers/Layout'
import Home from '../pages/Home'
import Cojin from '../pages/Cojin';
import Polos from '../pages/Polos';
import Tazas from '../pages/Tazas';
import ProductId from '../components/ProductId';
import CreateAccount from '../pages/CreateAccount';
import AuthProvider from '../context/AuthContext';
import LoginAccount from '../pages/LoginAccount';
import UserDashBoard from '../pages/UserDashBoard';
import ProtectedRoute from '../components/ProtectedRoute';
import ScrollToUp from '../components/ScrollToUp';
import UserDashboard2 from '../pages/UseDashboard2';
import Dashboard_prueba from '../pages/Dashboard_prueba';
import PruebaButton from '../components/PruebaButton';
import PruebaFucion from '../pages/PruebaFucion';

const App = () => {
  return (
    <AuthProvider>
      <HashRouter>
        <ScrollToUp/>
        <Layout>
          <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route exact path="/user" element={
            <ProtectedRoute>
              <Dashboard_prueba/>
            </ProtectedRoute>
            }/>
            {/* <Route exact path="/modal" element={<ModalProduct/>} /> */}
            <Route exact path="/polos" element={<Polos/>} />
            <Route exact path="/remedio" element={<PruebaFucion/>} />
            <Route exact path="/pruebabutton" element={<PruebaButton/>} />
            <Route exact path="/signin" element={<CreateAccount/>} />
            <Route exact path="/login" element={<LoginAccount/>} />
            <Route exact path="/tazas" element={<Tazas/>} />
            <Route exact path="/cojin" element={<Cojin/>} />
            <Route exact path="/cojin/:productId" element={<ProductId/>} />
          </Routes>
        </Layout>
      </HashRouter>
    </AuthProvider>
  )
}

export default App
