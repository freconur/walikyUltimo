import { useAuth } from "../context/AuthContext";
import { Navigate } from 'react-router-dom';
import app from "../firebase/firebase.config";
import { getFirestore, doc, getDoc  } from "firebase/firestore";
import { useEffect } from "react";


const db = getFirestore(app)
const ProtectedRoute = ({children}) => {
    const {user} = useAuth();
    useEffect(()=> {
        const getAdmin = async () => {
          const docRef = doc ( db, "userName", user.uid)
          const dataDoc = await getDoc(docRef)
            
            if (!user) {
                return <Navigate to='/' />
            }else if (dataDoc.data().rol === "usuario") {
                 return <Navigate to='/' />
             }
        }
        getAdmin()
      },[user.uid]);
    return <>{children}</>

}


export default ProtectedRoute;