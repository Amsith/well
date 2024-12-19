const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv');
const connectDB = require('./database/db');
const path = require('path')


// Import routes
const reviewRoute = require('./routes/reviewRoute');
const authenticationRoute = require('./routes/auththenticationRoute')

dotenv.config();

const app = express()

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors())



// Use routes
app.use('/api', reviewRoute); // Mount routes at /api
app.use('/api', authenticationRoute)

// Serve static files from the 'dist' folder
app.use(express.static(path.join(__dirname, './dist')));

// Fallback for unknown routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './dist/index.html'));
});


// Connect DB
connectDB()



//Server
const port = process.env.PORT;
app.listen(port, () => {
  console.log("Server running " + port)
})

// compression -> optimzed data delivery
// morgan -> log the information in readable way, debugging purpose

