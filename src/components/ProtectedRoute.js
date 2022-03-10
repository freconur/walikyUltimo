import { useAuth } from "../context/AuthContext";
import { Navigate } from 'react-router-dom';
import app from "../firebase/firebase.config";
import { getFirestore, doc, getDoc  } from "firebase/firestore";
import { useState } from "react";


const db = getFirestore(app)
const ProtectedRoute = ({children}) => {
    const {user} = useAuth();
    const [getUserData, setGetUserData] = useState([])
    
    const docRef = doc ( db, "userName", user.uid)
    getDoc(docRef)
        .then((doc) => {
            console.log(doc.data(), doc.id)
            setGetUserData(doc.data().rol)
        })
    if (!user) {
        return <Navigate to='/' />
    }else if (getUserData === "usuario") {
         return <Navigate to='/' />
     }

    return <>{children}</>

}


export default ProtectedRoute;