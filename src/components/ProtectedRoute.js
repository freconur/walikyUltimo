import { useAuth } from "../context/AuthContext";
import { Navigate } from 'react-router-dom';
// const {user, loading} = useAuth();
// if (loading) return <p>loading</p>

const ProtectedRoute = ({children}) => {
    const {user} = useAuth();
    if (!user) return <Navigate to='/' />

    return <>{children}</>

}


export default ProtectedRoute;