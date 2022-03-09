import React, { useState } from "react";
import app from "../firebase/firebase.config";
import { useAuth } from "../context/AuthContext";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import ProductCard from "../components/ProductCard";

const db = getFirestore(app);
const FavProducts = () => {
	
	const { user } = useAuth()
	const [favProduct, setFavProduct] = useState([])

	useState(() => { 
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
	}, []);
	return (
		<div>
			<div>
				<h1>Mis favoritos</h1>
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
