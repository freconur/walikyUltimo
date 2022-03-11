import React, { useState, useEffect } from "react";
import app from "../firebase/firebase.config";
import { useAuth } from "../context/AuthContext";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import ProductCard from "../components/ProductCard";
import "../styles/productContainer.css";
import '../styles/productContainer_res.css'
import PageLoading from "./PageLoading";
const db = getFirestore(app);
const FavProducts = () => {
	
	const { user, logout } = useAuth()
	const [favProduct, setFavProduct] = useState([])
	const [loading, setLoading] = useState(false)

	useEffect(() => { 
		const getProduct = async () => {
			
			const item = await getDocs(collection(db, `userName/${user.uid}/favProduct`));
      const docs = [];
      item.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
			setLoading(false)
			setFavProduct(docs)
		};
		getProduct();
	}, []);
	return (
		<div className="container__prod">
			<h1 className="product__title">Mis favoritos</h1>
			<div className='product__container'>
				{loading && <PageLoading/>}
				<ul className="container__products">
				{favProduct.map((prod) => (
				<ProductCard key={prod.id} prod={prod} />
				))}
				</ul>
			</div>
		</div>
	);
};

export default FavProducts;
