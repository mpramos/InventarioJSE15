import { auth, provider } from "./firebase.js";
import {signInWithPopup, signOut} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js"

const googleLogin = async () => {
    try {
        const result = await signInWithPopup(auth, provider)
        console.log('login');
        console.log('Usuario autenticado: ', result.user);
        window.location.href="dashboard.html"
        
    } catch (error) {
        console.log('Error en login: ', error);
        
    }
}

const logout = async () => {
    try {
        await signOut(auth)
        console.log('Sesión cerrada');
        window.location.href="index.html"
    } catch (error) {
        console.error('Error al cerrar sesión: ', error);
    }
}

document.getElementById("googleLoginBtn")?.addEventListener('click', googleLogin);
document.getElementById("logoutBtn")?.addEventListener('click', logout)
