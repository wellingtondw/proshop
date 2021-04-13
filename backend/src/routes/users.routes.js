import { Router } from 'express'
import { authUser } from '../controllers/userController.js'

const userRouter = Router()

userRouter.post('/login', authUser)

export default userRouter