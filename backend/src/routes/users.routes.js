import { Router } from 'express'
import { authUser, getUserProfile, registerUser } from '../controllers/userController.js'
import { ensureAuthenticated } from '../middlewares/authMiddleware.js'

const userRouter = Router()

userRouter.post('/login', authUser)
userRouter.post('/register', registerUser)
userRouter.get('/profile', ensureAuthenticated, getUserProfile)

export default userRouter