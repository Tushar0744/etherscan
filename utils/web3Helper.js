const Web3 = require('web3');

const web3 = new Web3(new Web3.providers.HttpProvider(process.env.ETHEREUM_RPC_URL));

async function getLatestBlock() {
  const block = await web3.eth.getBlock('latest');
  return block;
}

async function getBlockByNumber(blockNumber) {
  const block = await web3.eth.getBlock(blockNumber);
  return block;
}

module.exports = { getLatestBlock, getBlockByNumber };
