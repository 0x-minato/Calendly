import { NextFunction, Request, Response } from "express"
import { badRequest, unauthorized } from "../utils/api-error.js"

export function requireUserId(req: Request, _res: Response, next: NextFunction) {
    const userId = req.headers["x-user-id"]

    if (!userId || Array.isArray(userId) || typeof userId != 'string') {
        throw unauthorized("x-user-id header is required")
    }

    const parsedUserId = Number(userId)
    if (Number.isNaN(parsedUserId)) {
        throw badRequest("x-user-id must be a valid number")
    }

    req.userId = parsedUserId
    next()
}
