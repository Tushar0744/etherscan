const express = require('express');
const connectDB = require('./config/db');
const fetchAndStoreBlocks = require('./utils/fetchAndStoreBlocks'); // Import the function to fetch blocks


// Initialize Express
const app = express();

// Connect to the database
connectDB();

// Middleware to parse JSON
app.use(express.json());

// API Routes
const blockRoutes = require('./routes');
app.use('/api', blockRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);

  // Fetch and store the last 100 blocks when the server starts and every 15 seconds
  setInterval(fetchAndStoreBlocks, 15000); // Pass the function reference, not the result of calling it

});
