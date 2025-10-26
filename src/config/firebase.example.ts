import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

// Configuração do Firebase
// IMPORTANTE: Substitua pelos seus dados reais do Firebase Console
const firebaseConfig = {
  apiKey: "sua-api-key-aqui",
  authDomain: "seu-projeto.firebaseapp.com",
  projectId: "seu-projeto-id",
  storageBucket: "seu-projeto.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdefghijklmnopqr"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar serviços
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);

export default app;

/*
INSTRUÇÕES PARA CONFIGURAR O FIREBASE:

1. Acesse https://console.firebase.google.com/
2. Crie um novo projeto ou selecione um existente
3. Vá para "Project Settings" > "General" > "Your apps"
4. Clique em "Add app" e selecione "Web"
5. Registre a app e copie a configuração
6. Substitua os valores acima pelos seus dados reais
7. Renomeie este arquivo para firebase.ts

SERVIÇOS NECESSÁRIOS:

1. Firestore Database:
   - Vá para "Firestore Database" no console
   - Clique em "Create database"
   - Escolha "Start in test mode" (para desenvolvimento)
   - Selecione uma localização próxima

2. Storage:
   - Vá para "Storage" no console
   - Clique em "Get started"
   - Escolha "Start in test mode" (para desenvolvimento)

3. Authentication (opcional):
   - Vá para "Authentication" no console
   - Configure os métodos de login desejados

REGRAS DE SEGURANÇA (para desenvolvimento):

Firestore Rules:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

Storage Rules:
```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if true;
    }
  }
}
```

IMPORTANTE: Em produção, configure regras de segurança adequadas!
*/
