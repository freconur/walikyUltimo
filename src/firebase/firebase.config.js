import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
// import { getAuth } from "firebase/auth"
// import {getAuth} from "firebase/"
const firebaseConfig = {
    apiKey: "AIzaSyDTptq2aAkQDxK7lsrLu70EaM80cdgtSDg",
    authDomain: "data-ef982.firebaseapp.com",
    databaseURL: "https://data-ef982-default-rtdb.firebaseio.com",
    projectId: "data-ef982",
    storageBucket: "data-ef982.appspot.com",
    messagingSenderId: "596962971820",
    appId: "1:596962971820:web:53730bd70c61d065814f09"
  };

const app = initializeApp(firebaseConfig);

export default app;
