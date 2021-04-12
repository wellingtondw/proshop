import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'

import productsRoutes from './routes/products.routes.js'

dotenv.config()
connectDB()
const app = express()

app.use(express.json())

app.use('/api/products', productsRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`))