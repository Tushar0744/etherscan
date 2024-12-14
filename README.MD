# Ethereum Block & Account API Backend

This project is a Node.js backend application that provides several APIs for interacting with Ethereum's blockchain, fetching block details, account balances, transaction data, and ERC20 token details. The application uses Web3.js to interact with Ethereum and MongoDB to store block data for faster access.

## Features

- **Latest Block**: Fetch the latest Ethereum block.
- **Last N Blocks**: Fetch details of the last 'n' Ethereum blocks.
- **Account Details**: Retrieve the balance and the last 'n' transactions of a particular Ethereum account.
- **ERC20 Token Details**: Retrieve the balance and total supply of a specific ERC20 token for a given account.

## Tech Stack

- **Node.js**: Backend runtime environment.
- **Express**: Web framework for routing and handling HTTP requests.
- **Web3.js**: Library for interacting with the Ethereum blockchain.
- **MongoDB**: Database to store Ethereum block details.
- **dotenv**: To manage environment variables like Infura URL.

## Installation

### Prerequisites

Before you start, ensure that you have the following installed:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/) (You can use MongoDB Atlas for a cloud instance)
- An Infura account or a public Ethereum node URL

