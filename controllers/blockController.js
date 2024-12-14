const { Web3 } = require("web3");
const Block = require("../models/Block");
const Account = require("../models/Account");
const dotenv = require("dotenv");

// Initialize Web3 with an Infura (or other) provider
const web3 = new Web3(process.env.INFURA_URL);

// ERC20 Token ABI (basic methods: balanceOf, transfer, etc.)
const tokenABI = [
  {
    constant: true,
    inputs: [
      {
        name: "_owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        name: "balance",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
];

// Get the latest block
const getLatestBlock = async (req, res) => {
  try {
    // const latestBlock = await web3.eth.getBlock('latest');
    const latestStoredBlock = await Block.findOne().sort({ number: -1 });

    // Check if a block was found
    if (!latestStoredBlock) {
      return res
        .status(404)
        .json({ message: "No blocks found in the database" });
    }
    // Return the latest block as JSON
    res.json(latestStoredBlock);
    //res.json(latestBlock);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

// Get the last 'n' blocks
const getLastNBlocks = async (req, res) => {
  const n = parseInt(req?.query?.n); // 'n' is passed as a query parameter

  if (!n || isNaN(n)) {
    return res
      .status(400)
      .json({ error: "Invalid or missing query parameter: n" });
  }

  try {
    // Check how many blocks are in the database
    const storedBlocksCount = await Block.countDocuments();

    if (n <= storedBlocksCount) {
      // Fetch blocks from the database
      const blocks = await Block.find().sort({ number: -1 }).limit(n);
      res.json(blocks);
    } else {
      // If 'n' exceeds the stored blocks, fetch the missing blocks from the blockchain
      const latestBlockNumber = await web3.eth.getBlockNumber();
      const blocksToFetch = n - storedBlocksCount;

      // Fetch the remaining blocks from the blockchain
      for (
        let i = latestBlockNumber;
        i > latestBlockNumber - blocksToFetch;
        i--
      ) {
        const block = await web3.eth.getBlock(i.toString());

        // Store the block if it's not already in the database
        const existingBlock = await Block.findOne({
          number: block.number.toString(),
        });
        if (!existingBlock) {
          await Block.create({
            number: block.number.toString(),
            hash: block.hash,
            timestamp: block.timestamp.toString(),
            transactions: block.transactions,
          });
        }
      }

      // After fetching missing blocks, return the last 'n' blocks
      const blocks = await Block.find().sort({ number: -1 }).limit(n);
      res.json(blocks);
    }
  } catch (err) {
    console.error("Error fetching blocks:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get account details (eth balance, last n transactions)
const getAccountDetails = async (req, res) => {
  const { address, n } = req.params;
  try {
    // Step 1: Get the Ethereum balance
    const balance = (await web3.eth.getBalance(address)).toString();

    // Step 2: Retrieve the latest n blocks
    const blocks = await Block.find().sort({ number: -1 }).limit(parseInt(n));

    // Step 3: Fetch and filter transactions concurrently
    const transactions = (
      await Promise.all(
        blocks.map(async (block) => {
          return Promise.all(
            block.transactions.map(async (txHash) => {
              // here this is paid api call
              const tx = await web3.eth.getTransaction(txHash);
              // Check if the transaction is associated with the given address
              if (
                tx &&
                (tx.from.toLowerCase() === address.toLowerCase() ||
                  tx.to?.toLowerCase() === address.toLowerCase())
              ) {
                return tx;
              }
              return null;
            })
          );
        })
      )
    )
      .flat()
      .filter(Boolean); // Flatten and remove null entries

    // Step 4: Return the result
    res.json({ balance, transactions });
  } catch (error) {
    console.error("Error fetching account details:", error);
    res.status(500).send("Server Error");
  }
};

const getTokenDetails = async (req, res) => {
  const { tokenAddress, accountAddress } = req.params;

  try {
    // Create a token contract instance
    const tokenContract = new web3.eth.Contract(tokenABI, tokenAddress);

    // Get token balance using balanceOf method
    const balance = await tokenContract.methods
      .balanceOf(accountAddress)
      .call();

    // Get token decimals
    const decimals = await getDecimals(tokenContract);

    // Convert balance to human-readable format
    const humanReadableBalance =
      BigInt(balance) / BigInt(Math.pow(10, decimals));

    // Get total supply
    const totalSupply = await tokenContract.methods.totalSupply().call();

    // Convert total supply to human-readable format
    const humanReadableTotalSupply =
      BigInt(totalSupply) / BigInt(Math.pow(10, decimals));

    // Send response with human-readable values
    res.json({
      balance: humanReadableBalance.toString(), // Convert BigInt to string
      totalSupply: humanReadableTotalSupply.toString(), // Convert BigInt to string
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

const getDecimals = async (tokenContract) => {
  try {
    // Check if decimals method exists
    if (tokenContract.methods.decimals) {
      return await tokenContract.methods.decimals().call();
    }
    // If decimals is not implemented, return a default value (e.g., 18 decimals)
    return 18; // Default to 18 decimals (common for ERC20 tokens)
  } catch (err) {
    console.warn(`Error fetching decimals: ${err.message}`);
    return 18; // Fallback to 18 decimals
  }
};

module.exports = {
  getLatestBlock,
  getLastNBlocks,
  getAccountDetails,
  getTokenDetails,
};
