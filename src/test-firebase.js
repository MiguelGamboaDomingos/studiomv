// Teste simples do Firebase
import { db } from './config/firebase.js';
import { collection, getDocs } from 'firebase/firestore';

async function testFirebase() {
  try {
    console.log('Testando conexão com Firebase...');
    
    // Testar conexão com Firestore
    const testCollection = collection(db, 'test');
    const snapshot = await getDocs(testCollection);
    
    console.log('✅ Firebase conectado com sucesso!');
    console.log('Documentos na coleção test:', snapshot.size);
    
    return true;
  } catch (error) {
    console.error('❌ Erro ao conectar com Firebase:', error);
    return false;
  }
}

// Executar teste
testFirebase();
