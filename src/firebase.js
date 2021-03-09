import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth'

// TU CONFIGURACIÓN DE FIREBASE AQUÍ
var firebaseConfig = {
    apiKey: "AIzaSyD1ixx2U9GgdjYs1LgvmC48IHetnExUjHA",
    authDomain: "pruebadewc.firebaseapp.com",
    projectId: "pruebadewc",
    storageBucket: "pruebadewc.appspot.com",
    messagingSenderId: "25948615016",
    appId: "1:25948615016:web:da096be2a6801c414226dd",
    measurementId: "G-PDM9PMBLEV"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();

export {db, auth}
