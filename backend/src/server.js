import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import { errorHandler, notFound } from './middlewares/errorMiddleware.js'

import productsRoutes from './routes/products.routes.js'
import usersRoutes from './routes/users.routes.js'


dotenv.config()
connectDB()
const app = express()

app.use(express.json())

app.use('/api/products', productsRoutes)
app.use('/api/users', usersRoutes)

//handle global errors
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`))