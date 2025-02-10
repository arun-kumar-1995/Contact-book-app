import express from 'express'
const app = express()

import cors from 'cors'
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Use CORS middleware
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'application/json'],
  })
)
// import routes
import appRoute from './src/routes/index.js'
app.use('/app/v1', appRoute)

// global middleware
import errorMiddleware from './src/middlewares/error.middleware.js'
app.use(errorMiddleware)

export default app
