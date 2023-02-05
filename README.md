# :rocket: Rocketseat Ignite | FinAPI

Financial API, project from the Rocketseat Ignite course. Practical learning of Node.js basic concepts.

## Stack

- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com)

## Requirements:

It must be possible to:

- [x] Create an account.
- [x] Search for the customer's bank statement.
- [x] Make a deposit.
- [x] Make a withdrawal.
- [x] Search for the customer's bank statement by date.
- [x] Update the customer's account information.
- [x] Retrieve the customer's account information.
- [x] Delete an account.
- [x] Get the account balance.

## Business rules:

It must not be possible to:

- [x] Register an account with an existing NINO.
- [x] Make a deposit in a non-existent account.
- [x] Search for a statement in a non-existent account.
- [x] Make a withdrawal in a non-existent account.
- [x] Make a withdrawal when the balance is insufficient.
- [x] Delete a non-existent account.

## Available Scripts

Before starting, you need to have Git and Node installed on your machine.

Clone the repository:

```
  $ git clone https://github.com/thiagocabralcorreia/finAPI.git
```

In the project directory, you can install dependencies:

```
  $ yarn
```

You can start with:

```
  $ yarn start
```

And run the app in the development mode:

```
  $ yarn dev
```

Open [http://localhost:3333](http://localhost:3333) to view it in the browser.
The page will reload if you make edits.

_FinAPI by [Thiago Cabral Correia](https://www.linkedin.com/in/thiago-cabral-correia/) - 2023_
