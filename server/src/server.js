const express = require("express")
const path = require("path")
const cors = require("cors")
const listEndpoints = require("express-list-endpoints")
const mediaRouter = require("./services/media")
const {join} = require ("path")
//const reviewsRouter = require("./services/reviews")
const {
  catchAllHandler,
  forbiddenHandler,
  unauthorizedHandler,
  notFoundHandler,
} = require("./errorHandler")

const server = express()
const port = process.env.PORT || 3001

// MIDDLEWARES
const staticFolderPath = join(__dirname, "../public")
server.use(express.static(staticFolderPath))
server.use(express.json())
server.use(cors())

//make the content of the images folder available
server.use("/images", express.static(path.join(__dirname, "images")))

// Route /media
server.use("/media", mediaRouter)

// Route /reviews
//server.use("/reviews", reviewsRouter)

// Error handlers
server.use(notFoundHandler)
server.use(unauthorizedHandler)
server.use(forbiddenHandler)
server.use(catchAllHandler)

console.log(listEndpoints(server))

server.listen(port, () => {
  console.log("Server is running on ", port)
})