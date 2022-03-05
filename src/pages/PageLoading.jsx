import React from 'react'
import '../styles/PageLoading.css';
import Loader from '../components/Loader';
const pageLoading = () => {
  return (
    <div className="pageLoading">
      {/* cargando.... */}
      <Loader />
    </div>
  )
}

export default pageLoading
