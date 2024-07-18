// AuthService.js (o donde manejes la autenticación)

import { auth, store } from 'firebase';
import { getDoc, doc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const registerUser = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('Usuario registrado exitosamente:', user);
      return user;
    } catch (error: any) {
      console.error('Error al registrar usuario:', error.message);
      throw error;
    }
  };

const getUserByEmail = async (email: string) => {
  try {
    const userRef = doc(store, 'users', email); // 'users' es la colección donde tienes los usuarios
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      return userSnap.data();
    } else {
      console.log('No se encontró ningún usuario con ese correo electrónico.');
      return null;
    }
  } catch (error) {
    console.error('Error al obtener el usuario:', error);
    return null;
  }
};

const loginUser = async (email: string, password: string) => {
    if (!email || !password) {
        console.error('Correo electrónico y contraseña son requeridos');
        return;
      }
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('Inicio de sesión exitoso:', user);
      return user;
    } catch (error: any) {
      console.error('Error al iniciar sesión:', error.message);
      throw error;
    }
  };

  const logoutUser = async () => {
    try {
      await auth.signOut();
      console.log('Usuario ha cerrado sesión correctamente');
      // Puedes redirigir a la página de inicio o a donde desees después de cerrar sesión
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      throw error;
    }
  };

export { getUserByEmail, registerUser, loginUser, logoutUser };
