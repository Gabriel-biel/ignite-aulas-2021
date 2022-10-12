# desafio-chapter-2
Repo for study web development

### Teste do model
- [x] **Should be able to create an user with all props**

### Testes do repositório

- [x] **Should be able to create new users**
- [x] **Should be able to list all users**
- [x] **Should be able to find user by ID**
- [x] **Should be able to find user by e-mail address**
- [x] **Should be able to turn an user as admin**

### Testes de useCases
- [x] **Should be able to create new users**
- [x] **Should not be able to create new users when email is already taken**
- [x] **Should be able to turn an user as admin**
- [x] **Should not be able to turn a non existing user as admin**
- [x] **Should be able to get user profile by ID**
- [x] **Should not be able to show profile of a non existing user**
- [x] **Should be able to list all users**
- [x] **Should not be able to a non admin user get list of all users**
- [x] **Should not be able to a non existing user get list of all users**

### Testes de Rotas

- **Rota - [POST] /users**
    - [x] **Should be able to create new users**
    - [x] **Should not be able to create new users when email is already taken**
- **Rota - [PATCH] /users/:user_id/admin**
    - [x] **Should be able to turn an user as admin**
    - [x] **Should not be able to turn a non existing user as admin**
- **Rota - [GET] /users/:user_id**
    - [x] **Should be able to get user profile by ID**
    - [x] **Should not be able to show profile of a non existing user**
- **Rota - [GET] /users**
    - [x] Should be able to list all users
    - [x] Should not be able to a non admin user get list of all users
      [x] Should not be able to a non existing user get list of all users