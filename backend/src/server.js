const express = require('express')
const products = require('./data/products')

const app = express()

app.use(express.json())

app.get('/api/products', (request, response) => {
  return response.json(products)
})

app.get('/api/products/:id', (request, response) => {
  const { id } = request.params

  const product = products.find(product => product._id === id)

  return response.json(product)
})

app.listen(5000, console.log('Server is running on port 5000'))