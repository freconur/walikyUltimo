import React, { useState, useEffect } from "react";
import app from "../firebase/firebase.config";
import { useAuth } from "../context/AuthContext";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import ProductCard from "../components/ProductCard";

const db = getFirestore(app);
const FavProducts = () => {
	
	const { user, logout } = useAuth()
	const [favProduct, setFavProduct] = useState([])

	useEffect(() => { 
		const getProduct = async () => {
			
			const item = await getDocs(collection(db, `userName/${user.uid}/favProduct`));
      const docs = [];
      item.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
			console.log("valor de docs",docs)
			// debugger
			setFavProduct(docs)
		}
		getProduct()
	}, [user]);
	const handleLogout = async() => {
		try{
			await logout()
		}catch (error) {
			error("ups, parece que hubo un error")
		}

	}
	return (
		<div>
			<div>
				<h1>Mis favoritos</h1>
				<button onClick={handleLogout}>salir</button>
			</div>
			<ul className="container__products">
            {favProduct.map((prod) => (
              <ProductCard key={prod.id} prod={prod} />
            ))}
			</ul>
		</div>
	);
};

export default FavProducts;
