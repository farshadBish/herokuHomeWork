import express from "express"
import listEndpoints from "express-list-endpoints"
import cors from "cors"
import productsRouter from "./api/products/index.js"
import { badRequestHandler, genericErrorHandler, notFoundHandler } from "./errorHandlers.js"

const server = express()
const port = process.env.PORT || 3001
const corsOption = {
  origin : process.env.FE_DEV_URL
}

// ******************************************* MIDDLEWARES *************************************

server.use(cors(corsOption))
server.use(express.json())

// ****************************************** ENDPOINTS ****************************************

server.use("/products", productsRouter)

// ***************************************** ERROR HANDLERS ************************************
server.use(badRequestHandler)
server.use(notFoundHandler)
server.use(genericErrorHandler)

server.listen(port, () => {
  console.table(listEndpoints(server))
  console.log(`Server is listening on port ${port}`)
})
