import { Request, Response } from "express";
import { findAllUsers as findAllUsersService, getUser as getUserService, createUser as createUserService, updateUser as updateUserService, deleteUser as deleteUserService } from '../services/user.service.js'
import { sendSuccess } from "../utils/api-response.js";

export async function findAllUsers(_req: Request, res: Response) {
    const users = await findAllUsersService()
    sendSuccess(res, users, 200, "all users sent")
}

export async function getUserId(req: Request, res: Response) {
    const { id } = req.params
    const user = await getUserService(Number(id))
    sendSuccess(res, user)
}

export async function createUser(req: Request, res: Response) {
    const user = await createUserService(req.body)
    sendSuccess(res, user, 201, 'User Create successfully')
}

export async function updateUser(req: Request, res: Response) {
    const { id } = req.params
    const user = await updateUserService(Number(id), req.body)
    sendSuccess(res, user, 200, 'User updated successfully')
}

export async function deleteUser(req: Request, res: Response) {
    const { id } = req.params
    const user = await deleteUserService(Number(id))
    sendSuccess(res, user, 200, 'User deleted successfully')
}