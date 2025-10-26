# 🔥 Configuração do Firebase para MV Studio

Este guia explica como configurar o Firebase para o back office do MV Studio.

## 📋 Pré-requisitos

- Conta Google
- Projeto React já configurado
- Node.js e npm instalados

## 🚀 Passo a Passo

### 1. Criar Projeto Firebase

1. Acesse [Firebase Console](https://console.firebase.google.com/)
2. Clique em **"Criar um projeto"**
3. Nome do projeto: `mvstudio-backoffice` (ou nome de sua escolha)
4. Desative o Google Analytics (opcional para este projeto)
5. Clique em **"Criar projeto"**

### 2. Configurar Web App

1. No painel do projeto, clique no ícone **"Web" (</>)**
2. Nome da app: `MV Studio Admin`
3. **NÃO** marque "Firebase Hosting" por enquanto
4. Clique em **"Registrar app"**
5. **COPIE** a configuração mostrada (será necessária depois)
6. Clique em **"Continuar para o console"**

### 3. Configurar Firestore Database

1. No menu lateral, clique em **"Firestore Database"**
2. Clique em **"Criar banco de dados"**
3. Selecione **"Iniciar no modo de teste"**
4. Escolha uma localização próxima (ex: `europe-west1`)
5. Clique em **"Concluído"**

### 4. Configurar Storage

1. No menu lateral, clique em **"Storage"**
2. Clique em **"Começar"**
3. Selecione **"Iniciar no modo de teste"**
4. Mantenha a mesma localização do Firestore
5. Clique em **"Concluído"**

### 5. Configurar Authentication (Opcional)

1. No menu lateral, clique em **"Authentication"**
2. Vá para a aba **"Sign-in method"**
3. Ative **"Email/Password"**
4. Vá para a aba **"Users"**
5. Clique em **"Adicionar usuário"**
6. Email: `admin@mvstudio.pt`
7. Senha: `mvstudio2024`

## ⚙️ Configuração no Código

### 1. Instalar Dependências

```bash
npm install firebase
```

### 2. Configurar Firebase

1. Copie o arquivo `src/config/firebase.example.ts` para `src/config/firebase.ts`
2. Substitua a configuração pelos dados do seu projeto:

```typescript
const firebaseConfig = {
  apiKey: "sua-api-key-aqui",
  authDomain: "mvstudio-backoffice.firebaseapp.com",
  projectId: "mvstudio-backoffice",
  storageBucket: "mvstudio-backoffice.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdefghijklmnopqr"
};
```

### 3. Estrutura de Dados

O sistema criará automaticamente as seguintes coleções:

- **`projects`** - Projetos do portfolio
- **`services`** - Serviços oferecidos
- **`team`** - Membros da equipa
- **`testimonials`** - Testemunhos de clientes
- **`media`** - Assets de media (imagens, vídeos)
- **`contacts`** - Mensagens de contacto
- **`settings`** - Configurações do site

## 🔒 Regras de Segurança (Desenvolvimento)

### Firestore Rules

No Firebase Console > Firestore Database > Rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

### Storage Rules

No Firebase Console > Storage > Rules:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if true;
    }
  }
}
```

⚠️ **IMPORTANTE**: Estas regras são para desenvolvimento. Em produção, configure regras de segurança adequadas!

## 🎯 Funcionalidades Implementadas

### ✅ Gestão de Projetos
- Upload de vídeos para Firebase Storage
- Links externos para vídeos (YouTube, Vimeo)
- Thumbnails e metadados
- Status de publicação e destaque

### ✅ Upload de Vídeos
- **Modo Upload**: Carrega ficheiros diretamente para Firebase Storage
- **Modo Link**: Permite links externos (YouTube, Vimeo, etc.)
- Progress bar durante upload
- Validação de formatos e tamanhos
- Suporte para MP4, WebM, OGG, AVI, MOV, WMV

### ✅ Gestão de Media
- Organização de ficheiros por tipo
- Metadados automáticos (tamanho, duração, etc.)
- Preview e download
- Eliminação segura

### ✅ Outros Gestores
- Serviços com detalhes completos
- Equipa com competências e redes sociais
- Testemunhos com ratings
- Contactos com estados
- Configurações do site

## 🚀 Como Usar

1. **Aceder ao Admin**: `http://localhost:5173/admin`
2. **Login**: 
   - Utilizador: `admin`
   - Palavra-passe: `mvstudio2024`
3. **Navegar**: Use o menu lateral para aceder às diferentes seções
4. **Criar Conteúdo**: Clique em "Novo" em cada seção
5. **Upload de Vídeos**: Use o componente VideoUploader nos projetos

## 📱 Estrutura de Dados

### Projeto (Project)
```typescript
{
  id: string;
  title: string;
  description: string;
  category: string;
  client: string;
  year: number;
  duration: string;
  thumbnail: string;
  videoUrl?: string;
  featured: boolean;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

### Media Asset
```typescript
{
  id: string;
  name: string;
  type: 'image' | 'video' | 'document';
  url: string;
  size: number;
  filename: string;
  path: string;
  createdAt: Date;
}
```

## 🔧 Troubleshooting

### Erro de Configuração
- Verifique se copiou corretamente a configuração do Firebase
- Confirme se os serviços estão ativados no console

### Erro de Permissões
- Verifique as regras de segurança do Firestore e Storage
- Confirme se está no modo de teste

### Erro de Upload
- Verifique se o Storage está configurado
- Confirme o tamanho máximo dos ficheiros
- Verifique a conexão à internet

### Dados Não Aparecem
- Verifique se o Firestore está configurado
- Confirme se as coleções estão sendo criadas
- Verifique o console do browser para erros

## 📞 Suporte

Para problemas específicos:
1. Verifique o console do browser (F12)
2. Verifique os logs do Firebase Console
3. Confirme se todos os serviços estão ativos
4. Teste com dados simples primeiro

## 🎉 Próximos Passos

Após configurar o Firebase:
1. Teste todas as funcionalidades do admin
2. Configure regras de segurança para produção
3. Configure backup automático
4. Implemente autenticação real
5. Configure domínio personalizado

O sistema está pronto para produção após estas configurações! 🚀
