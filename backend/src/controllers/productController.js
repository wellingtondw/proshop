import expressAsyncHandler from 'express-async-handler'
import Product from '../models/ProductModel.js'

//@desc Fetch all products
//@route GET /api/products
//@access Public
const getProducts = expressAsyncHandler(async (request, response) => {
  const products = await Product.find({})
  return response.json(products)
})

//@desc Fetch single product
//@route GET /api/products/:id
//@access Public
const getProductById = expressAsyncHandler(async (request, response) => {
  const { id } = request.params

  const product = await Product.findById(id)

  if (product) {
    return response.json(product)
  } else {
    response.status(404)
    throw new Error('Product not found')
  }
})

export { 
  getProducts,
  getProductById
}