import { ZodSchema } from "zod"
import { badRequest } from "../utils/api-error.js"
import { Request, Response,NextFunction } from "express"

export const validate = (schema: ZodSchema) => 
    (req: Request, _res: Response, next: NextFunction) => {
        const result = schema.safeParse(req.body)

        if (!result.success) throw badRequest("Validation Failed", result.error.issues)
        
        req.body = result.data
        next()
}

export const validateQuery = (schema: ZodSchema) => 
    (req: Request, _res: Response, next: NextFunction) => {
        const result = schema.safeParse(req.query)

        if (!result.success) {
            throw badRequest('validation failed', result.error.issues)
        }

        req.query = result.data as Request['query']
        next()
}