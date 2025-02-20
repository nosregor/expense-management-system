import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'

let mongoServer: MongoMemoryServer

/**
 * Connect to the in-memory database.
 */
export const connect = async (): Promise<void> => {
  mongoServer = await MongoMemoryServer.create()
  const uri = mongoServer.getUri()
  await mongoose.connect(uri)
}

/**
 * Drop database, close the connection and stop mongod.
 */
export const closeDatabase = async (): Promise<void> => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
    await mongoose.disconnect()
    await mongoServer.stop()
  }
}

/**
 * Remove all the data for all db collections.
 */
export const clearDatabase = async (): Promise<void> => {
  const collections = mongoose.connection.collections
  console.log(Object.keys(collections).length)
  if (mongoose.connection.readyState !== 0) {
    const promises = Object.keys(collections).map(collection =>
      mongoose.connection.collection(collection).deleteMany({}),
    )
    await Promise.all(promises)
  }
}
