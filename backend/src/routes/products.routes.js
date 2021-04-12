import { Router } from 'express'
import expressAsyncHandler from 'express-async-handler'

import Product from '../models/ProductModel.js'

const productsRouter = Router()

//@desc Fetch all products
//@route GET /api/products
//@access Public
productsRouter.get('/', expressAsyncHandler( async (request, response) => {
  const products = await Product.find({})
  return response.json(products)
}))

//@desc Fetch single product
//@route GET /api/products/:id
//@access Public
productsRouter.get('/:id', expressAsyncHandler(async (request, response) => {
  const { id } = request.params

  const product = await Product.findById(id)

  if (product) {
    return response.json(product)
  } else {
    return response.status(404).json({ message: 'Product not found' })
  }

}))

export default productsRouter