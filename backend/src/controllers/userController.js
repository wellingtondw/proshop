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

export { authUser }