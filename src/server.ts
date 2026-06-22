import { app } from "./app.js"
import { connectDatabase } from "./config/database.js"
import { PORT } from './config/env.js'

export async function startServer() {
    await connectDatabase()
    app.listen(PORT, () => { // app.listen can throw an error if the particular port is in use
        console.log(`server is running on port ${PORT}`) 
    })
}

await startServer().catch((err) => {
    console.error("server error",err)
    process.exit(1)
})
