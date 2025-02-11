import './configs/loadEnv.config.js'

import app from './app.js'
import connectDB from './configs/db.configs.js'

const { PORT: port = 8000 } = process.env

const startServer = async () => {
  try {
    // connect to db
    // await connectDB()
    app.listen(port, () => {
      console.log(`Server started \n http://localhost:${port}`)
    })
  } catch (err) {
    console.error('Failed to start server:', err)
    process.exit(1)
  }
}

startServer()
