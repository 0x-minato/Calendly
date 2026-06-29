import express, { Express, NextFunction } from "express"
import { userRouter } from "./routers/user.routes.js"
import { eventTypeRouter } from "./routers/event-type.routes.js"
import { publicEventTypeRouter } from "./routers/public-event-type.routes.js"
import { errorHandler } from "./middlewares/error-handler.js"
import { routeNotFound } from "./middlewares/route-not-found.js"

export const app: Express = express()

function logRequest(req: Request, _res: Response, next: NextFunction) {
    console.log("URL", req.url)
    console.log("executed middleware")
    next() // calls the next function 
}
function anotherLogRequest(req: Request, _res: Response, next: NextFunction) {
    console.log("URL", req.url)
    console.log("executed another middleware")
    next() // calls the next function 
}

// const sequence = [logRequest, anotherLogRequest]

app.use(express.json()) // this will help express to deserialize the request body ( JSON ) into a js object 
// app.use is a function. It is different than a normal function 

app.get("/health", (_req, res) => {
    console.log("executed health route")
    res.json({ 
        status: "ok",
        timestamp: new Date().toISOString()
    })
})

app.use('/api/users', userRouter)
app.use('/api/event-types', eventTypeRouter)
app.use('/api/public/event-types', publicEventTypeRouter)

app.use(routeNotFound)
// at the last we register our err handling middleware
app.use(errorHandler)