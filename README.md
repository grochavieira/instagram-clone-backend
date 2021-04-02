<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/grochavieira/instagram-clone-frontend?color=%2304D361&style=flat">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/grochavieira/instagram-clone-frontend?style=flat">
  
  <a href="https://github.com/grochavieira/instagram-clone-frontend/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/grochavieira/instagram-clone-frontend?style=flat">
  </a>
    
   <img alt="License" src="https://img.shields.io/badge/license-MIT-brightgreen?style=flat">

</p>
<h1 align="center">
    <img src="./.github/logo_backend.png" />
</h1>

<h4 align="center"> 
	🚧  Aplicação em desenvolvimento... 🚧
</h4>

## 🏁 Tópicos

<p>
 👉<a href="#-sobre-o-projeto" style="text-decoration: none; "> Sobre</a> <br/>
👉<a href="#-funcionalidades" style="text-decoration: none; "> Funcionalidades</a> <br/>
👉<a href="#-layout" style="text-decoration: none"> Layout</a> <br/>
👉<a href="#-como-executar-o-projeto" style="text-decoration: none"> Como executar</a> <br/>
👉<a href="#-tecnologias" style="text-decoration: none"> Tecnologias</a> <br/>
👉<a href="#-autor" style="text-decoration: none"> Autor</a> <br/>
👉<a href="#user-content--licença" style="text-decoration: none"> Licença</a>

</p>

## 💻 Sobre o projeto

API do clone do Instagram.

---

<a name="-funcionalidades"></a>

## ⚙️ Funcionalidades

- [x] Rotas de usuário:
  - [x] Registrar;
  - [x] Listar;
  - [x] Detalhar (um único usuário);
  - [x] Logar.
- [x] Rotas de postagens:
  - [x] Criar;
  - [x] Listar (de acordo com os seguidores);
  - [x] Detalhar (um único post);
  - [x] Deletar.
- [x] Rotas de Curtidas:
  - [x] Atualizar (curtir ou descurtir).
- [x] Rotas de Seguir (Follow):
  - [x] Atualizar (seguir ou não seguir).
- [x] Rotas de Comentários:
  - [x] Criar;
  - [x] Deletar.
- [x] Rotas de Notificações:
  - [x] Listar (de acordo com o usuário);
  - [x] Atualizar (somente se o usuário visualizou ou não a notificação).
- [x] Socket.io foi adicionado para:
  - [x] Curtidas;
  - [x] Comentários;
  - [x] Postagens (criar e deletar);
  - [x] Seguidores;
  - [x] Notificações.
- [x] Cloudinary foi utilizado para armazenar as imagens;
- [x] Autentificação de rotas por meio de JWT;
- [x] MongoDB foi utilizado para armazenar os dados.

---

## 🎨 Layout

- **[Frontend](https://github.com/grochavieira/instagram-clone-frontend)**

---

## 🚀 Como executar o projeto

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/), [Yarn](https://classic.yarnpkg.com/en/docs/install).d
Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

### Váriaveis de Ambiente

> Veja o arquivo [.env.sample](https://github.com/grochavieira/instagram-clone-backend/blob/master/.env.sample)

#### 🎲 Rodando o Backend (servidor)

```bash

# Clone este repositório
$ git clone https://github.com/grochavieira/instagram-clone-backend.git

# Acesse a pasta do projeto no terminal/cmd
$ cd instagram-clone-backend

# Vá para a pasta server
$ cd server

# Instale as dependências com npm
$ npm install

# Execute a aplicação
$ npm start

# O servidor inciará na porta:3333 - acesse http://localhost:3333

```

---

## 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

#### **Server** ([NodeJS](https://nodejs.org/en/) + [TypeScript](https://www.typescriptlang.org/))

- **[express](https://expressjs.com/)**
- **[CORS](https://expressjs.com/en/resources/middleware/cors.html)**
- **[mongoDB](https://www.mongodb.com/)**
- **[mongoose](https://mongoosejs.com/)**
- **[cloudinary](https://cloudinary.com/)**
- **[jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)**
- **[image-data-uri](https://www.npmjs.com/package/image-data-uri)**
- **[ts-node](https://github.com/TypeStrong/ts-node)**
- **[multer](https://github.com/expressjs/multer)**
- **[socket.io](https://socket.io/)**

> Veja o arquivo [package.json](https://github.com/grochavieira/instagram-clone-backend/blob/master/package.json)

#### **Utilitários**

- Editor: **[Visual Studio Code](https://code.visualstudio.com/)**
- Teste de API: **[Insomnia](https://insomnia.rest/)**

---

<a name="-autor"></a>

## 🦸‍♂️ **Autor**

<p>
 <img src="https://avatars.githubusercontent.com/u/48029638?s=460&u=40540691957b5aabf04e2e1d4cddf8d3633cb1be&v=4" width="150px;" alt="grochavieira"/>
 <br />
 <sub><strong>🌟 Guilherme Rocha Vieira 🌟</strong></sub>
</p>

<p align="center">

[![Linkedin Badge](https://img.shields.io/badge/-linkedin-blue?style=flat&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/grochavieira/)](https://www.linkedin.com/in/grochavieira/)

</p>

---

## 📝 Licença

Este projeto esta sobe a licença [MIT](./LICENSE).

Feito com :satisfied: por Guilherme Rocha Vieira 👋🏽 [Entre em contato!](https://www.linkedin.com/in/grochavieira/)

---
