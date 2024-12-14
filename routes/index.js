const express = require('express');
const {
  getLatestBlock,
  getLastNBlocks,
  getAccountDetails,
  getERC20TokenDetails,
  fetchAndStoreBlocks,
  getTokenDetails,
} = require('../controllers/blockController');

const router = express.Router();

router.get('/latest-block', getLatestBlock);
router.get('/last-n-blocks/:n', getLastNBlocks);
router.get('/account/:address/:n', getAccountDetails);
router.get('/token/:tokenAddress/:accountAddress', getTokenDetails);


module.exports = router;
