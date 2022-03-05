import { createContext, useContext, useEffect } from 'react'
import app from '../firebase/firebase.config';
import { getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
     } from 'firebase/auth'
import { useState } from 'react';

    const auth = getAuth(app);
    const authContext = createContext();
    //esta es la funcion que va hacer de hook y colocarlos en todas los componentes
    export const useAuth = () => {
        const context = useContext(authContext);
        return context;
    }
    export function AuthProvider ({children}) {
        
        const [user, setUser] = useState({});
        //esto es los errores del patita, ya vere como lo puedo corregir

        useEffect(() => {
            onAuthStateChanged(auth, currentUser => {
                setUser(currentUser);
            })
        }, []);

        const signin = ( email, password ) => {
            createUserWithEmailAndPassword(auth, email, password)
        }
        const login = ( email, password ) => {
            signInWithEmailAndPassword(auth, email, password);
        }
        const logout = () => signOut(auth)
        // const logout = () => auth.signOut()
        //sirve para idnentificar al usuario que sea logeado o registrado en su defecto
        return <authContext.Provider value={{ signin, login, user, logout }}>{children}</authContext.Provider>
    }
export default AuthProvider;


