const { Web3 } = require("web3");
const Block = require("../models/Block");
const Account = require("../models/Account");
//const Token = require('../models/Token');

// Initialize Web3 with an Infura (or other) provider
const web3 = new Web3(process.env.INFURA_URL);

// Fetch the latest block number and store block data
const fetchAndStoreBlocks = async () => {
  try {
    // Fetch the latest block number (BigInt)
    const latestBlockNumber = await web3.eth.getBlockNumber();
    console.log("Latest Block Number:", latestBlockNumber.toString());

    const latestStoredBlock = await Block.findOne().sort({ number: -1 });
    const storedBlockNumber = BigInt(
      latestStoredBlock ? latestStoredBlock.number : "0"
    );

    // If we don't have enough blocks in DB, fetch and store the last 100 blocks
    if (storedBlockNumber !== latestBlockNumber) {
      // Loop to fetch the last 100 blocks
      for (
        let i = BigInt(latestBlockNumber);
        i > BigInt(latestBlockNumber) - BigInt(100);
        i--
      ) {
        try {
          const block = await web3.eth.getBlock(i.toString()); // Fetch block details

          // Check if the block already exists in the database
          const existingBlock = await Block.findOne({
            number: block.number.toString(),
          });
          if (!existingBlock) {
            // If block doesn't exist, store it in the database
            await Block.create({
              number: block.number.toString(),
              hash: block.hash,
              timestamp: block.timestamp.toString(), // Store timestamp as string
              transactions: block.transactions,
            });
            console.log(`Block ${block.number} stored`);
          }
        } catch (err) {
          console.error(`Error fetching block number ${i}:`, err);
        }
      }
    } else {
      console.log("Block data is already up to date in the database");
    }
  } catch (err) {
    console.error("Error fetching and storing blocks:", err);
  }
};

module.exports = fetchAndStoreBlocks;
