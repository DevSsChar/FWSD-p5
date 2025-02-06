// Project: Simple Content Delivery Server

// Objective: Create a static file server with basic APIs for logging user visits.
// Tasks:
// Serve static HTML, CSS, and JS files from a public directory.
// Log every user visit (IP, time) to a visits.log file using middleware.
// Provide an API endpoint (GET /logs) to retrieve the log data as JSON.
const express = require('express')
const fs=require('fs')
const app = express()
const port = 3000

app.use(express.static('public'))

const logVisit = (req, res, next) => {
    const ip = req.ip;
    const time = new Date().toISOString();
    const logMessage = `${ip} visited at ${time}\n`;
    
    fs.appendFileSync('visits.log', logMessage);
    next();
};
app.use(logVisit)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})