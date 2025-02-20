import * as dotenv from 'dotenv'

dotenv.config()

console.log(process.env.NODE_ENV)

interface IConfig {
  name: string
  port: string | number
  database: {
    MONGO_URI: string
  }
  secret: string
}

function getStringEnv(variable: string, defaultValue?: string): string {
  const val = process.env[variable]
  if (!val) {
    if (defaultValue) {
      return defaultValue
    }
    throw new Error(`${variable} not found. Set ${variable} environment variable.`)
  }
  return val
}

// default values
const NODE_ENV: string = getStringEnv('NODE_ENV', 'development')
const APP_NAME: string = getStringEnv('APP_NAME', 'EMS')
const PORT: string | number = getStringEnv('PORT', '3000')
const SECRET = getStringEnv('SECRET', 'TOP_SECRET')
const MONGO_URI = getStringEnv('MONGO_URI', 'mongodb://localhost:27017/expenses')

const development: IConfig = {
  name: APP_NAME,
  port: PORT,
  database: {
    MONGO_URI: MONGO_URI,
  },
  secret: SECRET,
}

const production: IConfig = {
  name: APP_NAME,
  port: PORT,
  database: {
    MONGO_URI: MONGO_URI,
  },
  secret: SECRET,
}

const config: {
  [name: string]: IConfig
} = { development, production }

export default config[NODE_ENV]
