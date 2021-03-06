<h1 align="center">HelPackage</h1>
<p align="center">Plataforma web de análise e gerenciamento de estoque para empresas privadas, com sincronização Offline</p>

<h1 align="center">
  <img alt="HelPackage" title="#" src="assets/logo.png" />
</h1>

![Badge](https://img.shields.io/github/issues/WalistonBelles/helPackage?color=green)
![Badge](https://img.shields.io/github/forks/WalistonBelles/helPackage)
![Badge](https://img.shields.io/github/stars/WalistonBelles/helPackage)
![Badge](https://img.shields.io/apm/l/vim-mode)

### Features

- [x] Tela Inicial

<img alt="HelPackage" title="#" src="assets/demo1.jpg" />

- [x] Relatórios em Gráficos de Estoque

<img alt="HelPackage" title="#" src="assets/demo2.jpg" />

- [x] Cadastro de Produtos

<img alt="HelPackage" title="#" src="assets/demo5.jpg" />

- [x] Listagem de Produtos 

<img alt="HelPackage" title="#" src="assets/demo3.jpg" />

- [x] Filtro de Produtos

<img alt="HelPackage" title="#" src="assets/demo4.jpg" />

- [x] Análise de Transações

<img alt="HelPackage" title="#" src="assets/demo6.jpg" />

- [x] Sincronizão Offline com Online
- [ ] Notificações de produtos em falta


### 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

#### Backend
- [NodeJS](https://www.nodejs.org)
- [MYSQL](https://www.mysql.com)
- [Knex.JS](https://www.knexjs.org)
- [Express.JS](https://expressjs.com/pt-br/)
- [Axios](https://www.npmjs.com/package/axios)
- [Body-Parser](https://www.npmjs.com/package/body-parser)
- [Cors](https://www.npmjs.com/package/cors)
- [Jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [Multer](https://www.npmjs.com/package/multer)
- [Bcrypt](https://www.npmjs.com/package/bcrypt)
- [Mysql2](https://www.npmjs.com/package/mysql2)
- [Internet Available](https://www.npmjs.com/package/internet-available)

#### Frontend
- [Vue.JS](https://cli.vuejs.org)
- [Axios](https://www.npmjs.com/package/axios)
- [Luxon](https://www.npmjs.com/package/luxon)
- [Vue-Datetime](https://www.npmjs.com/package/vue-datetime-custom)
- [Vue-Chartjs](https://vue-chartjs.org/)
- [Vue-Transitions](https://www.npmjs.com/package/vue2-transitions)
- [Weekstart](https://www.npmjs.com/package/weekstart)

## Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:

- [Node.js](https://nodejs.org/en/) 
- [Mysql](https://dev.mysql.com/downloads/mysql/)
- Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

### 🎲 Rodando o Back End (servidor)
<br>

```bash
# Clone este repositório
$ git clone <https://github.com/WalistonBelles/HelPackage>

# Acesse a pasta do projeto no terminal/cmd
$ cd HelPackage

# Vá para a pasta backend
$ cd backend

# Instale as dependências
$ npm install

# Vá para a pasta database
$ cd database

# Configure suas credenciais de conexão com o banco de dados

connection: {
      host : '127.0.0.1',
      user : 'seuusuárioaqui',
      password : 'suasenhaaqui',
      database : 'nomedoseubancodedados'
    }

# Execute a aplicação
$ node index.js

# O servidor inciará na porta:3000 - acesse <http://localhost:3000>
```
### 🎲 Rodando o Front End
<br>

```bash
# Acesse a pasta do projeto no terminal/cmd
$ cd HelPackage

# Vá para a pasta frontend
$ cd frontend

# Instale as dependências
$ npm install

# Execute a aplicação
$ npm run serve
```

### Autor
---

<a href="https://github.com/WalistonBelles/">
 <img style="border-radius: 50%;" src="assets/autor.jpg" width="100px;" alt=""/>
 <br />
 <sub><b>Waliston Belles</b></sub></a> <a href="https://www.facebook.com/waliston.belles">🚀</a>

[![Gmail Badge](https://img.shields.io/badge/-walistonbelles1@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:walistonbelles1@gmail.com)](mailto:walistonbelles1@gmail.com)