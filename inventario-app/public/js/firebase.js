import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAlAObJTfegVsHitoaXdQCpM71R3u-pcLY",
  authDomain: "inventario-36357.firebaseapp.com",
  projectId: "inventario-36357",
  storageBucket: "inventario-36357.appspot.com",
  messagingSenderId: "286137968560",
  appId: "1:286137968560:web:8e8b7abfee1b6595219875"
};

const app = initializeApp(firebaseConfig);
const auth= getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider()

export {db, auth,provider, collection, addDoc, getDocs, doc, updateDoc, deleteDoc}