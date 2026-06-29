import { Router } from "express"
import { getPublicEventType } from "../controllers/event-type.controller.js"

export const publicEventTypeRouter: Router = Router()

publicEventTypeRouter.get("/:userId/:slug", getPublicEventType)
