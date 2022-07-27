# typescript
Chapter IV - Testes e Regras de Negócio

### Diagrama
![image](https://user-images.githubusercontent.com/61027045/162596040-e5a0c04e-2703-472f-b92a-0eaf2dc09645.png)

---

# Cadastro de Carro

**Requisitos Funcionais(RF)**
=> Deve ser possível cadastrar um novo carro
=> Deve ser possível listar todas as categorias

**Requisitos Não Funcionais(RNF)**
[x]

**Regras De Negócio(RN)**
=> Não deve ser possível cadastrar um carro com a placa já existente
=> Não deve ser possível alterar a placa de um carro já cadastrado
=> O carro deve ser cadastrado, por padrã, com disponibilidade
=> O usuário responsavel pelo cadastro deve ser um adm

---

# Listagem de Carros

**Requisitos Funcionais**
=> Deve ser possível listar todos os carros disponíveis 
=> Deve ser possível listar todos os carros pelo nome da categoria
=> Deve ser possível listar todos os carros pelo nome da marca
=> Deve ser possível listar todos os carros pelo nome do carro

**Requisitos não funcionais**
[x]

**Regras de Negócio**
=> O usuário não precisa estar logado no sistema

---

# Cadastro de Especificação no Carro

**Requisitos Funcionais**
=> Deve ser possível cadastrar uma especificação para um carro
=> Deve ser possíel listar todas as especificações
=> Deve ser possível listar todos os carros

**Requisitos Não Funcionais**
[x]

**Regras de Negócio**
=> Não deve ser possível cadastrar uma especificação para um carro não cadastrado
=> Não deve ser possível cadastrar uma especificação já existente para o mesmo carro
=> O usuário responsavel pelo cadastro de um especifição deve ser um adm

---

# Cadastro de Imagens do Carro

**Requisitos Funcionais**
=> Deve ser possível cadastrar a imagem do carro
=> Deve ser possível listar todos os carros

**Requisitos Não Funcionais**
=> Utilizar o multer para upload dos arquivos

**Regras de Negócio**
=> O usuário devev poder cadastrar mais de uma imagem para o mesmo carro
=> O usuário responsavel pelo cadastro de imagem deve ser um adm

---

# Aluguel de Carro

**Requisitos Funcionais**
=> Deve ser possível cadastrar um aluguel

**Requisitos Não Funcionais**
[x]

**Regras de Negócio**
=> O aluguel deve ter duração mínima de 24 horas
=> Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário
=> Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro