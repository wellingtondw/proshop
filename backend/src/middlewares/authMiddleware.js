import jwt from 'jsonwebtoken'
import User from '../models/UserModel.js'
import expressAsyncHandler from 'express-async-handler'

const ensureAuthenticated = expressAsyncHandler(async (request, response, next) => {
  const { authorization } = request.headers
  let token = ''

  if(authorization && authorization.startsWith('Bearer')) {
    try {
      token = authorization.split(' ')[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      request.user = await User.findById(decoded.id).select('-password')

      next()
    } catch (error) {
      console.error(error)
      response.status(401)
      throw new Error('Not Authorized, token failed')
    }
  }

  if(!token) {
    response.status(401)
    throw new Error('Not Authorized, no token provided')
  }
})

export { ensureAuthenticated }