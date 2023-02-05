const express = require("express");
const { v4: uuidV4 } = require("uuid");

const app = express();
app.use(express.json());

const customers = [];

/**
 * nino - string
 * name - string
 * id - uuid
 * statement - [])
 */

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

app.listen("3333");
