import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

// Configuração do Firebase
// NOTA: Estas são configurações de exemplo. Em produção, use variáveis de ambiente.
const firebaseConfig = {
  apiKey: "AIzaSyDNFXWoUnFXgsMVLly_3pWSflSgTqopUto",
  authDomain: "mvstudio-backoffice.firebaseapp.com",
  projectId: "mvstudio-backoffice",
  storageBucket: "mvstudio-backoffice.firebasestorage.app",
  messagingSenderId: "588071766231",
  appId: "1:588071766231:web:7cc626105ad88c9b018892",
  measurementId: "G-WZPQMYF2G3"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar serviços
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);

export default app;
