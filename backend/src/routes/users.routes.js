import { Router } from 'express'
import { authUser, getUserProfile } from '../controllers/userController.js'
import { ensureAuthenticated } from '../middlewares/authMiddleware.js'

const userRouter = Router()

userRouter.post('/login', authUser)
userRouter.get('/profile', ensureAuthenticated, getUserProfile)

export default userRouter