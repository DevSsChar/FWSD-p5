// Project: E-Commerce Product Catalog API

// Objective: Build an API for managing an e-commerce product catalog.
// Tasks:
// GET /products: Return all products.
// GET /products/:id: Fetch a specific product by ID.
// GET /products?category=electronics: Filter products by category.
// Use route parameters and query strings effectively.

const express = require('express')
const fs = require('fs')
const router = express.Router()
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/products', (req, res) => {
  if (req.query.category) {
    fs.readFile('products.json', 'utf8', function (err, data) {
      // Display the file content
      let data1 = JSON.parse(data)

      var result = data1.filter(function (element) {
        if (element.category == req.query.category) {
          return true;
        } else {
          return false;
        }
      });
      res.send(result)
    });
  } else {
    fs.readFile('products.json', 'utf8', function (err, data) {
      // Display the file content
      res.send(`${JSON.stringify(JSON.parse(data), null, 2)}`)
    });
  }
})
app.get('/products/:slug', (req, res) => {
  fs.readFile('products.json', 'utf8', function (err, data) {
    // Display the file content
    let data1 = JSON.parse(data)
    var result = data1.filter(function (element) {
      if (element.id == req.params.slug) {
        return true;
      } else {
        return false;
      }
    });
    res.send(result)
  });
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})