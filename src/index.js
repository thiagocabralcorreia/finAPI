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

/**
 * nino - string
 * name - string
 * id - uuid
 * statement - [])
 */

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
    nino,
    name,
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

app.listen("3333");
