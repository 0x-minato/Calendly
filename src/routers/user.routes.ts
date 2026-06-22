import { Router } from 'express'
import { createUser, deleteUser, findAllUsers, getUserId, updateUser } from '../controllers/user.controller.js'
import { validate } from '../middlewares/validate.js'
import { createUserSchema, updateUserSchema } from '../dtos/user.dto.js'

export const userRouter: Router = Router()

userRouter.get('/', findAllUsers)
userRouter.get('/:id', getUserId)
userRouter.post('/', validate(createUserSchema), createUser)
userRouter.patch('/:id', validate(updateUserSchema), updateUser)
userRouter.delete('/:id', deleteUser)