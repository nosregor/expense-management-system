import app from './app'
import { connectDB, disconnectDB } from './database'
import { logger } from './utils/logger'

const PORT = process.env.PORT || 3000

async function startServer() {
  try {
    await connectDB()

    const server = app.listen(PORT, () => {
      logger.info(`⚡️[server]: Server is running at http://localhost:${PORT}`)
    })

    const shutdown = async () => {
      logger.info('Shutting down server...')
      server.close(async () => {
        await disconnectDB()
        logger.info('Server and MongoDB connection closed.')
        process.exit(0)
      })
    }

    process.on('SIGINT', shutdown)
    process.on('SIGTERM', shutdown)
  } catch (error) {
    logger.error('Failed to start server:', error)
    process.exit(1)
  }
}

process.on('uncaughtException', error => {
  logger.error('Uncaught Exception:', error)
  process.exit(1)
})

process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', promise, 'Reason:', reason)
  process.exit(1)
})

startServer()
