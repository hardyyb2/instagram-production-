//Dependencies import
const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const path = require('path')

//files import
const errorHandler = require('./server/middlewares/ErrorHandler')
const { connectDB } = require('./server/database/db')
const { errorMsg, successMsg } = require('./server/utils/messages')
const { authenticateToken } = require('./server/middlewares/verifyJWT')
//routers
const authRouter = require('./server/routes/authRouter')
const userRouter = require('./server/routes/userRouter')
const postRouter = require('./server/routes/postRouter')

//Variables && funtions
const app = express()
app.use(cors())
const PORT = process.env.PORT || 3001
const API_ROUTE = `/api/${process.env.API_VERSION}`

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'build')))
}

dotenv.config()

//connect Database
connectDB()

//routes
app.use(`${API_ROUTE}/auth`, authRouter)
app.use(`${API_ROUTE}/user`, authenticateToken, userRouter)
app.use(`${API_ROUTE}/post`, authenticateToken, postRouter)
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build/index.html'))
  })
}

//middlewares
app.use(errorHandler)

//Start server
const server = app.listen(PORT, (err) => {
  err ? errorMsg(err) : successMsg(`Server running at port` + PORT)
})

//Exit process on unhandled rejections
process.on('unhandledRejection', (err) => {
  errorMsg(`Error: ${err.message}`)
  server.close(() => process.exit(1))
})
