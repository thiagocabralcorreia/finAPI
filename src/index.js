const express = require("express");
const { v4: uuidV4 } = require("uuid");

const app = express();
app.use(express.json());

const customers = [];

// Middleware
function checkForAccountNINO(request, response, next) {
  const { nino } = request.headers;

  const customer = customers.find((customer) => customer.nino === nino);

  if (!customer) {
    return response.status(400).json({ error: "Customer not found." });
  }

  request.customer = customer;

  return next();
}

function getBalance(statement) {
  const balance = statement.reduce((acc, operation) => {
    if (operation.type === "credit") {
      return acc + operation.amount;
    } else {
      return acc - operation.amount;
    }
  }, 0);

  return balance;
}
// Create account
app.post("/account", (request, response) => {
  const { nino, name } = request.body;
  const customerAlreadyExists = customers.some(
    (customer) => customer.nino === nino
  );

  if (customerAlreadyExists) {
    return response
      .status(400)
      .json({ error: "This customer already exists." });
  }

  customers.push({
    nino, // string
    name, // string
    id: uuidV4(),
    statement: [],
  });

  return response.status(201).send();
});

// app.use(checkForAccountNINO)

// List bank statement
app.get("/statement", checkForAccountNINO, (request, response) => {
  const { customer } = request; // request.customer = customer

  return response.json(customer.statement);
});

app.post("/deposit", checkForAccountNINO, (request, response) => {
  const { description, amount } = request.body;

  const { customer } = request;

  const statementOperation = {
    description,
    amount,
    created_at: new Date(),
    type: "credit",
  };

  customer.statement.push(statementOperation);

  return response.status(201).send();
});

app.post("/withdraw", checkForAccountNINO, (request, response) => {
  const { amount } = request.body;

  const { customer } = request;

  const balance = getBalance(customer.statement);

  if (balance < amount) {
    return response.status(400).json({ error: "Insufficient founds!" });
  }

  const statementOperation = {
    amount,
    created_at: new Date(),
    type: "debit",
  };

  customer.statement.push(statementOperation);

  return response.status(201).send();
});

app.get("/statement/date", checkForAccountNINO, (request, response) => {
  const { customer } = request;
  const { date } = request.query;

  const dateFormat = new Date(date + " 00:00");

  const statement = customer.statement.filter(
    (statement) =>
      statement.created_at.toDateString() ===
      new Date(dateFormat).toDateString()
  );

  return response.json(customer.statement);
});

app.listen("3333");
