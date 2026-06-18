import express, { Express } from "express"

export const app: Express = express()

app.get("/health",(_req, res) => {
    res.json({
        status: "ok",
        timestamp: new Date().toISOString()
    })
})