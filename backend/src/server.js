import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'

import products from './data/products.js'

dotenv.config()
connectDB()
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

const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`))