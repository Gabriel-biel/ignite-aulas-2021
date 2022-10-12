const express = require('express')
const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(express.json())

const customers = [];

//Middleware
function verifyExistsAccountCPF(request, response, next) {
  const { cpf } = request.headers;
  const customer = customers.find(customer => customer.cpf === cpf);
  if (!customer) {
    return response.status(400).json({ error: "Customer Not Found!" })
  }
  request.customer = customer;
  return next();
}

function getBalance(statement) {
  const balance = statement.reduce((acc, operation) => {
    if (operation.type === 'credit') {
      return acc + operation.amount;
    } else {
      return acc - operation.amount;
    }
  }, 0);
  return balance;
}

//Created Account
app.post('/account', (request, response) => {
  const { cpf, name } = request.body;

  const customerAllreadyExists = customers.some((customer) => customer.cpf === cpf);
  if (customerAllreadyExists) {
    return response.status(400).json({ error: "Customer Allready Exists!" })
  }
  customers.push({
    cpf,
    name,
    id: uuidv4(),
    statement: []
  });
  return response.status(201).send()
})

//Status Account
app.get('/statement', verifyExistsAccountCPF, (request, response) => {
  const { customer } = request;
  return response.json(customer.statement);
})

//Deposit
app.post('/deposit', verifyExistsAccountCPF, (request, response) => {
  const { description, amount } = request.body;
  const { customer } = request;

  const statementOperation = {
    description,
    amount,
    created_at: new Date(),
    type: 'credit'
  }

  customer.statement.push(statementOperation)

  return response.status(201).send();
})

//Withdraw
app.post('/withdraw', verifyExistsAccountCPF, (request, response) => {
  const { amount } = request.body;
  const { customer } = request;

  const balance = getBalance(customer.statement);

  if (balance < amount) {
    return response.status(400).json({ error: "Insuficiente Funds!" });
  }

  const statementOperation = {
    amount,
    created_at: new Date(),
    type: 'debit'
  };

  customer.statement.push(statementOperation);

  return response.status(201).send();

})

//Status this Date Account
app.get('/statement/date', verifyExistsAccountCPF, (request, response) => {
  const { customer } = request;
  const { date } = request.query;

  const dateFormat = new Date(date + " 00:00");

  const statement = customer.statement.filter((statement) =>
    statement.created_at.toDateString() === new Date(dateFormat).toDateString())

  return response.json(statement);
})

//Update client basedata
app.put('/account', verifyExistsAccountCPF, (request, response) => {
  const { name } = request.body;
  const { customer } = request;
  customer.name = name;

  return response.status(201).send();
})

//Get Data Client
app.get('/account', verifyExistsAccountCPF, (request, response) => {
  const { customer } = request;

  return response.json(customer);
})

//Delet Account
app.delete('/account', verifyExistsAccountCPF, (request, response) => {
  const { customer } = request;
  customers.splice(customer, 1);
  return response.status(200).json(customers);
})

//Show Balance
app.get('/balance', verifyExistsAccountCPF, (request, response) => {
  const { customer } = request;
  const balance = getBalance(customer.statement);

  return response.json(balance)
})

app.listen(3333);
