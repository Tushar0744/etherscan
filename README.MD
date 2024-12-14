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



## API
1. Getting Latest Block

`curl --location 'http://localhost:5000/api/latest-block' \
--header 'Cookie: sails.sid=s%3AkpAsTChi04ISj3428xg_7n0CsI4kOEvE.JGOnbLROXp%2BPkFIoQsJNR%2F%2BfreumqwIX3aD9UUfnhw0' \
--data ''`

2. Getting Latest n Blocks

`curl --location 'http://localhost:5000/api/last-n-blocks/:n?n=10' \
--header 'Cookie: sails.sid=s%3AkpAsTChi04ISj3428xg_7n0CsI4kOEvE.JGOnbLROXp%2BPkFIoQsJNR%2F%2BfreumqwIX3aD9UUfnhw0'`

3. Getting Account Details

`curl --location 'http://localhost:5000/api/account/0x742d35Cc6634C0532925a3b844Bc454e4438f44e/10' \
--header 'Cookie: sails.sid=s%3AkpAsTChi04ISj3428xg_7n0CsI4kOEvE.JGOnbLROXp%2BPkFIoQsJNR%2F%2BfreumqwIX3aD9UUfnhw0'`

4. Getting ERC20 Token Details

`curl --location 'http://localhost:5000/api/token/0xdac17f958d2ee523a2206206994597c13d831ec7/0x742d35cc6634c0532925a3b844bc454e4438f44e' \
--header 'Cookie: sails.sid=s%3AkpAsTChi04ISj3428xg_7n0CsI4kOEvE.JGOnbLROXp%2BPkFIoQsJNR%2F%2BfreumqwIX3aD9UUfnhw0'`


