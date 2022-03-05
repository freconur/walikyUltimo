import React from "react";
import ReactDOM from 'react-dom'
import '../styles/ModalProduct.css'
import '../styles/ModalProduct_res.css'
const ModalProduct = ({ open, children, onClose }) => {
	if(!open) return null;

  return ReactDOM.createPortal(   
	<>
    	<div className="portalOverlay">
			<div className="portalstyles">
					{children}
			</div>
		</div>
	</>,
		document.getElementById('portal')
	  
  );
};

export default ModalProduct;
