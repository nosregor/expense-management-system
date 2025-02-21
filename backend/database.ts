import { connect, connection, ConnectOptions, Mongoose } from 'mongoose'
import config from './config/index'
import { logger } from './utils/logger'

const MONGO_URI = `${config.database.MONGO_URI}`

const connectOptions: ConnectOptions = {
  retryWrites: true,
}

export async function connectDB(): Promise<Mongoose> {
  try {
    const conn = await connect('localhost', connectOptions)
    logger.info(`MongoDB :: connected to ${MONGO_URI}`)
    return conn
  } catch (error) {
    logger.error('Failed to connect to MongoDB:', error)
    throw error
  }
}

export async function disconnectDB(): Promise<void> {
  try {
    await connection.close()
    logger.info('MongoDB connection closed.')
  } catch (error) {
    logger.error('Failed to disconnect from MongoDB:', error)
    throw error
  }
}

// Event handlers for MongoDB connection
connection.on('connecting', () => {
  logger.info('MongoDB :: connecting')
})

connection.on('error', error => {
  logger.error(`MongoDB :: connection ${error}`)
})

connection.on('connected', () => {
  logger.info(`MongoDB :: connected to ${MONGO_URI}`)
})

connection.on('disconnected', () => {
  logger.warn('MongoDB :: connection disconnected')
})

connection.on('reconnected', () => {
  logger.info('MongoDB :: connection reconnected')
})
