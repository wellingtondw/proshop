import expressAsyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../models/UserModel.js'

//@desc Auth user & get token
//@route POST /api/users/login
//@access Public
const authUser = expressAsyncHandler(async (request, response) => {
  const { email, password } = request.body

  const user = await User.findOne({ email })
  const userAlreadyExistsAndMatchPassword = user && await user.matchPassword(password)

  if(!userAlreadyExistsAndMatchPassword) {
    response.status(401)
    throw new Error('Invalid Email or Password')
  }

  return response.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    token: generateToken(user._id)
  })
})

//@desc Register a new user
//@route POST /api/users/register
//@access Public
const registerUser = expressAsyncHandler(async (request, response) => {
  const { name, email, password } = request.body

  const userAlreadyExists = await User.findOne({ email })

  if(userAlreadyExists) {
    response.status(400)
    throw new Error('User already exists')
  }
  
  const user = await User.create({
    name,
    email,
    password
  })

  if(user) {
    return response.status(201).json({ 
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id)
    })
  }

  response.status(400)
  throw new Error('Invalid user data')  
})

//@desc Get user profile
//@route GET /api/users/profile
//@access Private
const getUserProfile = expressAsyncHandler(async (request, response) => {
  const { _id } = request.user
  const user = await User.findById(_id)

  if(!user) {
    response.status(404)
    throw new Error('User not found')
  }

  return response.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin
  })   
})

export { authUser, registerUser, getUserProfile }